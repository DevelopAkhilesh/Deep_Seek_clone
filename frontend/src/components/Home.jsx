import React from 'react'
import Sidebar from './Sidebar'
import Promt from './Promt'
import { useState } from 'react'


const Home = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div  className="flex h-screen bg-[#1e1e1e] text-white overflow-hidden">
      {/* Sidebarcode */}
     <div className={`fixed top-0 left-0 h-full w-64 bg-[#232327] transition-transform z-40
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:relative md:flex-shrink-0`}>
        <Sidebar/>
        </div>

     {/* {promt code} */}
    <div className="flex-1 flex flex-col w-full md:ml-64">
     <div className="flex-1 flex items-center justify-center px-2 sm:px-6">
        <Promt/>
    </div>
    </div>




    </div>
  )
}

export default Home
