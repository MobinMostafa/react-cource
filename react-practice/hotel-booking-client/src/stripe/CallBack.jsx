import { useEffect } from "react";
import Loader from "../components/loader/Loader";
import { useSelector, useDispatch } from "react-redux";
import { getAccountStatus } from "../actions/stripe";
import { updateUserInLocalStorage } from "../actions/stripe";
import { setUser } from "../features/users/usersSlice";

const CallBack = () => {
  const auth = useSelector((state) => state.users.user); // Accessing user data from Redux store
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAccountStatus = async () => {
      if (!auth?.token) return;

      try {
        const res = await getAccountStatus(auth.token);
        updateUserInLocalStorage(res.data, () => {
          dispatch(setUser(res.data));
        });

        console.log("Updated Redux State:", res.data); // Debugging log

        // Redirect after Redux updates
        setTimeout(() => {
          window.location.href = "/auth/dashboard";
        }, 500);
      } catch (error) {
        console.log("Error fetching account status:", error);
      }
    };

    fetchAccountStatus();
  }, [auth]);

  return (
    <div className="flex justify-center items-center">
      <Loader />
    </div>
  );
};

export default CallBack;
