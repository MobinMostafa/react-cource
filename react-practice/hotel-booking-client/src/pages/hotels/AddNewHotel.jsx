/*  AddNewHotel.jsx  */
import { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import { FiMapPin } from "react-icons/fi";      // location icon (react-icons)
import { DatePicker } from "antd";
import moment from "moment";
import { createHotel } from "../../actions/hotel.js";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";



/* ---------- free API helper (OpenStreetMap / Nominatim) ---------- */
const fetchCitiesBD = async (query) => {
  if (query.length < 2) return [];

  const url =
    "https://nominatim.openstreetmap.org/search?" +
    new URLSearchParams({
      q: query,
      // countrycodes: "bd",      // 🇧🇩 Bangladesh only
      addressdetails: 1,
      format: "json",
      limit: 10,
    });

  const resp = await fetch(url, {
    headers: {
      "User-Agent": "hotel-app-demo/1.0 (your@email.com)",
    },
  });
  const data = await resp.json();

  return data.map((item) => {
    const city =
      item.address.city ||
      item.address.town ||
      item.address.village ||
      item.address.county ||
      item.display_name;
    return city;
  });
};

/* ----------------------------------------------------------------- */
export default function AddNewHotel() {
  const auth = useSelector((state) => state.users.user);

  const navigate = useNavigate();
  // console.log(auth)

  const [preview, setPreview] = useState("https://placehold.co/600x400");
  const [values, setValues] = useState({
    title: "",
    content: "",
    location: "",
    price: "",
    image: "",
    bed: "",
    postedBy: auth.user._id,
    from:"",
    To:"",
  });
  const { title, content, location, price,image,postedBy, bed, from, to } = values;

  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ---------- live suggestions ----------------------------------- */
  useEffect(() => {
    let cancel = false;

    (async () => {
      if (location.trim().length < 2) {
        setSuggestions([]);
        return;
      }
      setLoading(true);
      try {
        const cities = await fetchCitiesBD(location.trim());
        if (!cancel) setSuggestions(cities);
      } catch (err) {
        console.error("Nominatim error:", err);
      } finally {
        !cancel && setLoading(false);
      }
    })();

    return () => {
      cancel = true;
    };
  }, [location]);

  /* ---------- handlers ------------------------------------------- */
  const change = (e) =>
    setValues({ ...values, [e.target.name]: e.target.value });

  const choose = (city) => {
    setValues({ ...values, location: city });
    setSuggestions([]);
  };

  const pickImage = (e) => {
   
    setPreview(URL.createObjectURL(e.target.files[0]));
    setValues({ ...values, image: e.target.files[0] });
  };


 

  const handleSave = async (e) => {

    e.preventDefault();
    
      const hotelData = new FormData();
        hotelData.append("title", title);
        hotelData.append("content", content);
        hotelData.append("location", location);
        image && hotelData.append("image", image);
        hotelData.append("postedBy", postedBy);
        hotelData.append("price", price);
        hotelData.append("bed", bed);
        hotelData.append("from", from);
        hotelData.append("to", to);
       

        // console.log([...hotelData]);
        

    try{
      const res = await createHotel(auth.token,hotelData);
      console.log("hotel created response", res);
      toast.success('Hotel created successfully');
      setTimeout(() => {
        window.location.reload();
        navigate('/auth/dashboard')
      },1000)
    }catch(error){
       toast.error(error, 'Hotel creation failed. Please try again.');
    }
  };

  /* ---------- JSX ------------------------------------------------- */
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl lg:text-3xl font-bold text-center mb-6">
        Add New Hotel
      </h2>

      <div className="flex flex-col lg:flex-row gap-6 max-w-5xl mx-auto">
        {/* ---------- left panel (inputs) ---------- */}
        <section className="flex-1 bg-base-200 p-6 rounded shadow space-y-4">
         <form onSubmit={handleSave}>
          {/* image */}
          <div>
            
            <input
              type="file"
              accept="image/*"
              name="image"
              onChange={pickImage}
              className="file-input w-full"
              placeholder="Choase an image"
              
            />
            <p className="text-xs mt-1">Max size 2 MB</p>
          
          </div>
          
          <div className="mt-4">
            <input
            name="title"
            placeholder="Hotel title"
            value={title}
            onChange={change}
            className="input w-full"
            required
          />
          </div>

         <div className="mt-4">
           <textarea
            name="content"
            placeholder="Description"
            value={content}
            onChange={change}
            className="textarea w-full h-24"
            required
          />
         </div>

          {/* location with icon + dropdown */}
          <div className="relative mt-4">
            <div className="flex items-center">
              <FiMapPin className="absolute left-3 z-100 text-gray-500 pointer-events-none" />
              <input
                name="location"
                value={location}
                onChange={change}
                placeholder="City within world"
                autoComplete="off"
                className="input w-full pl-10"
              />
            </div>

            {loading && (
              <span className="absolute right-3 top-3 loading loading-spinner loading-xs" />
            )}

            {suggestions.length > 0 && (
              <ul className="absolute text-base-content z-10 bg-base-300 shadow rounded w-full mt-1 max-h-52 overflow-y-auto">
                {suggestions.map((city, idx) => (
                  <li
                    key={idx}
                    onClick={() => choose(city)}
                    className="p-2 text-base-content bg-base-400 hover:bg-base-600 cursor-pointer"
                  >
                    {city}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="mt-4">
            <input
            name="price"
            type="number"
            step="0.01"
            placeholder="Price (USD)"
            value={price}
            onChange={change}
            className="input w-full"
            required
          />
          </div>

          <div className="mt-4">
            <input
            name="bed"
            type="number"
            min="1"
            placeholder="Number of beds"
            value={bed}
            onChange={change}
            className="input w-full"
            required
          />
          </div>

          <div className="mt-4">
            <DatePicker placeholder="From date" onChange={(date, dateString) => setValues({...values, from:dateString })} 
          className="input w-full"
          disabledDate={(current) => current && current < moment().subtract(1, "days")}
           />
          </div>

         <div className="mt-4">
           <DatePicker placeholder="To date" onChange={(date, dateString) => setValues({...values, to:dateString })} 
           className="input w-full "
            disabledDate={(current) => current && current < moment().subtract(1, "days")}
            />
         </div>

          <button type="submit" className="btn btn-neutral w-full mt-4">
            Save
          </button>
          </form>
        </section>

        {/* ---------- right panel (preview) ---------- */}
        <section className="flex-1 bg-base-300 p-6 rounded shadow">
          <h3 className="text-center text-2xl font-bold mb-4">Preview</h3>
         <div>
           <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-cover rounded mb-4"
          />
         </div>
          <p className="mt-2 text-lg">Title: {title}</p>
          <p className="mt-2 text-lg">Content: {content}</p>
          <p className="mt-2 text-lg">Price: {price}</p>
          <p className="mt-1 text-lg">Beds: {bed}</p>
          <p className="mt-1 text-lg">City: {location}</p>
          <p className="mt-1 text-lg">From: {from}</p>
          <p className="mt-1 text-lg">To: {to}</p>
        </section>
      </div>
    </div>
  );
}
