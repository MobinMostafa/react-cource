
import { TbBuildingBurjAlArab } from "react-icons/tb";

const Dashboard = () => {
  // Form state
//   const [guestName, setGuestName] = useState("");
//   const [guestEmail, setGuestEmail] = useState("");
//   const [guestPhone, setGuestPhone] = useState("");
//   const [roomType, setRoomType] = useState("");
//   const [checkIn, setCheckIn] = useState("");
//   const [checkOut, setCheckOut] = useState("");
  // const [adults, setAdults] = useState(1);
  // const [children, setChildren] = useState(0);

  return (
    <div className="container mx-auto p-6 ">
      {/* Navbar */}
      <div className="bg-base-200 rounded-lg shadow-md p-4 lg:px-[40px]">
        <h1 className="text-xl lg:text-3xl font-bold flex items-center gap-2 mt-[30px]">
          <TbBuildingBurjAlArab className="text-3xl text-red-600" />Booking Dashboard
        </h1>
       <div className="mt-4">
           <div className="flex flex-wrap gap-2 lg:gap-4 lg:py-[20px]">
          
{/* 
          {["Dashboard", "Rooms", "Bookings", "Guests", "Reports"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="btn btn-outline text-sm lg:text-lg">
              {item}
            </a>
          ))} */}

          {/* name of each tab group should be unique */}
<div className="tabs tabs-border w-full rounded-lg shadow-lg">
  <input type="radio" name="my_tabs_2" className="tab" aria-label="Your Booking" />
  <div className="tab-content border-base-300 bg-base-100 p-10">Tab content 1</div>

  <input type="radio" name="my_tabs_2" className="tab" aria-label="Your Hotel" defaultChecked />
  <div className="tab-content border-base-300 bg-base-100 p-10">Tab content 2</div>

  <input type="radio" name="my_tabs_2" className="tab" aria-label="Tab 3" />
  <div className="tab-content border-base-300 bg-base-100 p-10">Tab content 3</div>
</div>
           </div>
       </div>
      </div>

      {/* Stats Section */}
      {/* <section className="grid grid-cols-1 md:grid-cols-4 gap-6 my-6">
        {[
          { label: "Total Rooms", value: 50 },
          { label: "Available", value: 32 },
          { label: "Occupied", value: 18 },
          { label: "Today's Check-ins", value: 5 },
        ].map((stat, index) => (
          <div key={index} className="card bg-primary text-white p-4 shadow-md">
            <h3 className="text-lg font-semibold">{stat.label}</h3>
            <p className="text-xl">{stat.value}</p>
          </div>
        ))}
      </section> */}

      {/* Booking Form */}
      {/* <section className="card bg-base-100 p-6 shadow-lg">
        <h2 className="text-xl font-bold mb-4">New Booking</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Guest Name" className="input input-bordered"  required />
          <input type="email" placeholder="Email" className="input input-bordered"  required />
          <input type="tel" placeholder="Phone" className="input input-bordered"  required />
          <select className="select select-bordered"  required>
            <option value="">Select Room Type</option>
            <option value="standard">Standard</option>
            <option value="deluxe">Deluxe</option>
            <option value="suite">Suite</option>
          </select>
          <input type="date" className="input input-bordered"  required />
          <input type="date" className="input input-bordered"  required />
          <input type="number" className="input input-bordered" min="1" defaultValue={adults} onChange={(e) => setAdults(Number(e.target.value))} required />
          <input type="number" className="input input-bordered" min="0" defaultValue={children} onChange={(e) => setChildren(Number(e.target.value))} />
          <button type="submit" className="btn btn-primary col-span-2">Book Room</button>
        </form>
      </section> */}

      {/* Available Rooms */}
      {/* <section className="mt-6">
        <h2 className="text-xl font-bold mb-4">Available Rooms</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
     
          {[1, 2, 3].map((room) => (
            <div key={room} className="card bg-base-100 shadow-md p-4">
              <h3 className="font-semibold">Room {room}</h3>
              <p>Type: Deluxe</p>
              <p>Price: $100/night</p>
              <button className="btn btn-secondary">Book Now</button>
            </div>
          ))}
        </div>
      </section> */}

    </div>
  );
};

export default Dashboard;
