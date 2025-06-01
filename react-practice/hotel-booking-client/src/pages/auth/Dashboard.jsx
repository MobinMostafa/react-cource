import { useState, useMemo, useEffect } from "react";
import { TbBuildingBurjAlArab } from "react-icons/tb";
import YourHotel from "../../components/hotel/YourHotel";
import { useSelector,useDispatch } from "react-redux";
import { GrStripe } from "react-icons/gr";
import { createConnectAccount, getAccountBalance,currencyFormatter, payoutSetting } from "../../actions/stripe.js";
import { toast } from "react-toastify";
import { IoSettingsOutline } from "react-icons/io5";
import { sellerHotels } from "../../actions/hotel.js";
import HotelCard from "../../components/hotel/HotelCard.jsx";
import { fetchUser } from "../../actions/auth.js";
import { updateUser } from "../../features/users/usersSlice.js";

const Dashboard = () => {
  const auth = useSelector((state) => state.users.user);
  const dispatch = useDispatch();
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
  setLoading(true);
  try {
    const res = await createConnectAccount(auth.token);

    if (res.data && res.data.startsWith("http")) {
      window.location.href = res.data;
    }

    // Fetch updated user and update Redux state
    const updatedUser = await fetchUser(auth.token);
    if (updatedUser) {
      dispatch(updateUser(updatedUser));
    }
  } catch (error) {
    toast.error("Stripe setup failed. Try again.",error);
  } finally {
    setLoading(false);
  }
};


  const handlePayout = async () => {
     setLoading(true);
     try{
         const res = await payoutSetting(auth.token);
        //  console.log(res);
         window.location.href = res.data.url;
         toast.success("Payout settings open in window wait a moment please.");
         setLoading(false);
     }catch(error){
       console.log(error)
       toast.error("Payout settings failed. Please try again.");
     }
  };

  // seller hotels
const [sellerHotel, setSellerHotel] = useState([]);

useEffect(() => {
  const getSellerHotels = async () => {
    try {
      const { data } = await sellerHotels(auth.token);
      setSellerHotel(data);
    } catch (error) {
      console.log(error);
    }
  };
  getSellerHotels();
}, [auth.token]);

const showButton = false;
const owner = true;
  return (
    <div className="container mx-auto p-6">
      {/* Navbar */}
      <div className="bg-base-200 rounded-lg shadow-md p-4 lg:px-[40px]">
      <div className="flex justify-between items-center gap-2 mt-[30px]">
          <h2 className="text-md lg:text-3xl font-bold flex items-center gap-2">
          <TbBuildingBurjAlArab className="text-xl lg:text-3xl text-red-600" />Booking Dashboard
          </h2>
          {isStripeSetupComplete && (
          <> 
           {balance && balance.pending && balance.pending.map((ba) => (
           <div className="tooltip">
              <div className="tooltip-content">
                <div className=" text-base-100 text-sm lg:text-md">Pending Balance</div>
              </div>
              <span className="text-sm text-base-400 lg:py-4 lg:px-4 lg:text-xl font-bold " key={ba}> {currencyFormatter(ba)}</span>
            </div>
           
           ))}
           <div className="tooltip">
              <div className="tooltip-content">
                <div className=" text-base-100 text-sm lg:text-md">Payout Setting</div>
              </div>
              <h2 className="text-sm lg:text-xl font-bold cursor-pointer flex items-center gap-2" onClick={handlePayout} ><IoSettingsOutline /> Payout</h2>
            </div>
          
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
              <> 
                <YourHotel />
              {/* my hotel booking start  */ }
                  <div className="container mx-auto p-6">
                      <h2 className='text-2xl lg:text-4xl font-bold my-3 lg:my-5 lg:mb-10  text-center'>My Hotels</h2>
                      <div className="grid grid-cols-1 gap-4 lg:gap-8">
                      {sellerHotel.length === 0 && <h2 className='text-xl lg:text-2xl font-bold my-3 lg:my-5 lg:mb-10  text-center text-red-500'>No Hotels Found. You don't have any hotel</h2>}
                        {sellerHotel.map((hotel) => (
                          <HotelCard key={hotel._id} hotel={hotel} showButton={showButton} owner={owner} />
                        ))}
                      </div>
                    </div>
                  
                {/* my hotel booking end  */}
                </>
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
