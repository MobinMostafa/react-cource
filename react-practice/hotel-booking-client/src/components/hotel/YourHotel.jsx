
import { FaPlus } from "react-icons/fa";
const YourHotel = () => {
  return (
    <div>
       
        <div className="container mx-auto p-6">
            <div className="bg-base-200 rounded-lg shadow-md p-4 flex items-center justify-between gap-2 mt-[30px]">
                <div className="text-xl lg:text-3xl font-bold ">
                    Your Hotel
                </div>

                <div>
                    <button className='btn btn-neutral'><FaPlus /> Add new Hotel</button>
                </div>
           
            </div>
        </div>
    </div>
  )
}

export default YourHotel