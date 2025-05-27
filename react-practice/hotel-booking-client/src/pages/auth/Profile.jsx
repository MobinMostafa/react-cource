import React from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment';


const Profile = () => {
   const auth = useSelector((state) => state.users.user);
  return (
       <div className="container mx-auto p-6">
          {/* Navbar */}
          <div className="bg-base-200 rounded-lg shadow-md p-4">
                    <h1 className=" text-2xl lg:text-3xl font-bold text-center py-5">Profile Settings</h1> 
          <div className='flex flex-wrap items-center gap-4'>
          <div className="avatar avatar-placeholder">
              <div className="bg-neutral text-neutral-content w-12 rounded-full">
              <span className="text-xl">{auth.user.username[0].toUpperCase()}</span>
              </div>
            </div>
            <h2 className="text-xl lg:text-3xl font-bold flex items-center gap-2">
              {auth.user.username}
              
            </h2>
          </div>
           <div className="mt-4">
               <div className="flex flex-wrap gap-2 lg:gap-4">
                  <div className="card bg-base-100 shadow-md p-4 w-full lg:w-1/2">
                    <h2 className="text-lg font-bold">User Information</h2>
                    <p><strong>Name:</strong> {auth.user.username}</p>
                    <p><strong>Email:</strong> {auth.user.email}</p>
                    <p><strong>Phone:</strong> {auth.user.phone ? auth.user.phone : 'N/A'}</p>
                  </div>
                  <div className="card bg-base-100 shadow-md p-4 w-full lg:w-1/2">
                    <h2 className="text-lg font-semibold">Account Details</h2>
                    <p><strong>Member Since:</strong> {moment(auth.user.createdAt).fromNow()}</p>
                  </div>
               </div>
           </div>
          </div>
          {/* Profile Section */}
        
      </div>
  )
}

export default Profile