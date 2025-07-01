import React from 'react'
import sidebar_close from "../assets/sidebar_close_icon.svg"
import profile_icon from "../assets/profile_icon.svg"
import {LogOut}from "lucide-react"

const Sidebar = () => {

    
  return (
    <div className='h-full flex flex-col justify-between p-4'>
   {/* Header */}
   <div>
   <div className="flex border-b border-gray-600 p-2 justify-between items-center mb-4">
    <div className="text-2xl font-bold text-gray-200">DeepSeek</div>
    <button><img src={sidebar_close} alt="" /></button>
   </div>

   {/* History */}
   <div className=" flex-1 overflow-y-auto px-4 py-3 space-y-2">
    <button className=" w-full bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl mb-4">
        New Chat
        </button>
    <div className=" text-gray-500 text-sm mt-20 text-center">No Chat History Yet</div>
   </div>
    </div>
   {/* Footer */}
   <div className='p-1 border-t border-gray-600'>
    <div className='flex flex-col gap-3 mt-3'>
        <div className='flex items-center gap-2 cursor-pointer'>
            <img src={profile_icon} alt="profile image" />
            <span className='text-gray-300 font-bold'>My Profile</span>
        </div>
        <button className='w-full flex items-center gap-2 text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-700 duration-300 transition'>
            <LogOut className=''/>Logout
            </button>
    </div>

    </div>
  </div>)
}

export default Sidebar
