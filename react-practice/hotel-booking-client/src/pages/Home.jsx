import { useState, useEffect } from 'react';
import Banner from '../components/banner/Banner';
import { getHotels } from '../actions/hotel';
import HotelCard from '../components/hotel/HotelCard';

const Home = () => {
const [hotels, setHotels] = useState([]);
const showButton = true;
const onwner = false;

useEffect(() => {
   const allHotels = async () => {
      try {
         const {data} = await getHotels();
         setHotels(data);
      } catch (error) {
         console.log(error,"all data fetch error");
      }
   }
   allHotels();
}, [])
 

  

  return (
    <div>
      <Banner />

      {/* //all hotels */}
      <div className="container mx-auto p-6 my-10">
         <h2 className='text-2xl lg:text-4xl font-bold my-3 lg:my-5 lg:mb-10  text-center'>All Hotels</h2>
        <div className="grid grid-cols-1 gap-4 lg:gap-8">
          {hotels.map((hotel) => (
            <HotelCard key={hotel._id} hotel={hotel} onwner={onwner} showButton={showButton} />
          ))}
        </div>
      </div>
     
    </div>
  );
};

export default Home;
