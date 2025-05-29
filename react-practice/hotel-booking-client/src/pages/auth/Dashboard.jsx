import { useState, useMemo, useEffect } from "react";
import { TbBuildingBurjAlArab } from "react-icons/tb";
import YourHotel from "../../components/hotel/YourHotel";
import { useSelector } from "react-redux";
import { GrStripe } from "react-icons/gr";
import { createConnectAccount, getAccountBalance } from "../../actions/stripe.js";
import { toast } from "react-toastify";

const Dashboard = () => {
  const auth = useSelector((state) => state.users.user);
  const [loading, setLoading] = useState(false);

  const user = useMemo(() => auth?.user, [auth]);
  const isStripeSetupComplete =
    user?.stripeAccountId && user?.stripeSeller?.charges_enabled;

  const [balance, setBalance] = useState(0);

  useEffect(() => {
      getAccountBalance(auth.token).then((res) => {
        // console.log(res);
        setBalance(res.data);
      });
  }, [])

  const handleClick = async () => {
    if (!auth?.token) {
      toast.error("Authentication token is missing. Please log in again.");
      return;
    }

    setLoading(true);
    try {
      let res = await createConnectAccount(auth.token);
      console.log(res);

      if (res.data && typeof res.data === "string" && res.data.startsWith("http")) {
        window.location.href = res.data;
      } else {
        toast.error("Invalid Stripe redirect URL.");
      }
    } catch (error) {
      console.error("Stripe connect error:", error);
      toast.error("Stripe connect failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      {/* Navbar */}
      <div className="bg-base-200 rounded-lg shadow-md p-4 lg:px-[40px]">
      <div className="flex justify-between items-center gap-2 mt-[30px]">
          <h2 className="text-xl lg:text-3xl font-bold flex items-center gap-2">
          <TbBuildingBurjAlArab className="text-3xl text-red-600" />Booking Dashboard
          </h2>
          {isStripeSetupComplete && (
          <> 
          <h2 className="text-xl lg:text-xl font-bold ">Pending Balance</h2>
          <h2 className="text-xl lg:text-xl font-bold ">Payout Settings</h2>
          </>
          )}
         
      </div>

        <div className="mt-4 mb-10">
          <div className="tabs tabs-border w-full rounded-lg shadow-lg">
            <input type="radio" name="my_tabs_2" className="tab" aria-label="Your Booking" />
            <div className="tab-content border-base-300 bg-base-100 p-10">Tab content 1</div>

            <input type="radio" name="my_tabs_2" className="tab" aria-label="Your Hotel" defaultChecked />
            <div className="tab-content border-base-300 bg-base-100 p-10">
              {isStripeSetupComplete ? (
                <YourHotel />
              ) : (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Setup payment method with Stripe</h2>
                  <p className="mb-4">
                    To manage your hotel and bookings, please set up your payment method with Stripe.
                  </p>
                  <div className="flex justify-center">
                    <button
                      onClick={handleClick}
                      className="btn bg-red-500 hover:bg-red-600 text-white flex items-center"
                    >
                      <GrStripe className="text-2xl mr-2" />
                      {loading ? "Processing..." : "Connect with Stripe"}
                    </button>
                  </div>
                </div>
              )}
            </div>

            <input type="radio" name="my_tabs_2" className="tab" aria-label="Tab 3" />
            <div className="tab-content border-base-300 bg-base-100 p-10">Tab content 3</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
