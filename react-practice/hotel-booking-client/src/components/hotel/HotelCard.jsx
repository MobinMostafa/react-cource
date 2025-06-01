
import { currencyFormatter } from '../../actions/stripe'
import { diffDays } from '../../actions/hotel'
import {useNavigate} from 'react-router-dom'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const HotelCard = ({hotel, showButton, owner}) => {
    const navigate = useNavigate()
  return (
    <div className="card md:card-side bg-base-300 shadow-sm">
  <figure className='lg:w-[40%]'>
    {hotel.image && hotel.image.contentType ? 
       <img
      src={`${import.meta.env.VITE_API_URL}/hotel/image/${hotel._id}`}
      alt="hotel booking"
      className='w-[100%]'
       />
      : <img
      src="https://placehold.co/600x400"
      alt="hotel booking" />
    }
  </figure>
  <div className="card-body lg:w-[60%]">
    <h2 className="card-title lg:text-3xl">{hotel.title} <span className='text-red-500 font-bold'>{currencyFormatter({amount: hotel.price, currency: "USD"})}</span>  </h2>
    <p className='alert alert-neutral lg:text-xl font-semibold text-red-400'>{hotel.location}</p>
    <p className='lg:text-lg mt-4'>{`${hotel.content.substring(1, 200)} ...`}</p>
    <div className="card-actions justify-start flex flex-col">
      <span className='text-md font-bold text-red-500'>
        for {diffDays(hotel.from, hotel.to)} {" "} {diffDays(hotel.from, hotel.to) > 1 ? "days" : "day"} 
      </span>
      <p className='text-lg font-extrabold'>
        {hotel.bed} {" "} {hotel.bed > 1 ? "beds" : "bed"}
      </p>
      <p className='text-lg'>
        Available from: <span className='text-red-500'>{new Date(hotel.from).toLocaleDateString("en-US")}</span>
      </p>
     {showButton &&  <button onClick={() => navigate(`/hotels/hotel-details/${hotel._id}`) } className='btn bg-red-500 hover:bg-red-600 text-white'>Show more</button>}
     {owner && <div className='flex gap-2'>
        <button onClick={() => navigate(`/hotels/edit-hotel/${hotel._id}`) } className='btn bg-red-500 hover:bg-red-600 text-white'><FaEdit className='text-lg lg:text-2xl' /></button>
        <button onClick={() => navigate(`/hotels/delete-hotel/${hotel._id}`) } className='btn bg-red-500 hover:bg-red-600 text-white'><MdDelete className='text-lg lg:text-2xl' /></button>
     </div> }
    </div>
  </div>
</div>
  )
}

export default HotelCard