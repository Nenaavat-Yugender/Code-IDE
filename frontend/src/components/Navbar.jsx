import React, { useState } from 'react'
import logo from '../images/logo.png'
import { Link, useNavigate } from 'react-router-dom';  // for the Link tag
import Avatar from 'react-avatar';
import { MdLightMode } from "react-icons/md";    //for using lightMode icons
import { BsFillGridFill } from "react-icons/bs";  //for using grid icons
import { toggleClass } from '../helper';


const Navbar = () => {
  return (
    <>
      <div className="navbar flex items-center  justify-between px-[100px] h-[80px] bg-[#2c2c2cbb]">
        <div className="logo left flex items-center w-[150px] cursor-pointer  h-[55px]">
          <img src={logo} alt="" />
        </div>
        <div className="links flex items-center gap-5 mr-20  w-[400px]">
          <Link>Home</Link>
          <Link>About</Link>
          <Link>Contact</Link>
          <Link>Services</Link>
          <Avatar onClick={()=>{toggleClass(".dropDownNavbar","hidden")}} name="Wim Mostmans" size="40" round="50%" className='cursor-pointer ml-2 ' />
        </div>

        <div className='dropDownNavbar hidden absolute right-[60px] top-[70px] shadow-lg shadow-black/50 !p-[15px] rounded-lg w-[150px] h-[160px] bg-[#141416] ' >
          <div className=' !py-[10px]  border-b-[2px] border-b-[#fff] ' >
            <h3 className=' text-[17px] ' style={{lineHeight:1}} >Mr.Nenaavath Yugender</h3>
          </div>
          <i className='flex items-center gap-2 !mt-3 !mb-2 '  ><MdLightMode className='text-[20px]' />Light Mode</i>
          <i className='flex items-center gap-2 !mt-3 !mb-2 '  ><BsFillGridFill className='text-[20px]' />Toggle Grid</i>
        </div>
      </div>
    </>
  )
}

export default Navbar
