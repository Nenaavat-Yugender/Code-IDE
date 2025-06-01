import React, { useState } from 'react'
import logo from '../images/logo.png'
import { Link, useNavigate } from 'react-router-dom';  // for the Link tag
import Avatar from 'react-avatar';
import { MdLightMode } from "react-icons/md";    //for using lightMode icons
import { BsFillGridFill } from "react-icons/bs";  //for using grid icons
import { toggleClass } from '../helper';
import { useEffect } from 'react';
import { api_base_url } from '../helper';  // Importing the base URL for API requests

const Navbar = ({ isGridLayout, setIsGridLayout }) => {

  const [data, setData] = useState(null);                          // State to hold user data
  const [Error, setError] = useState("");                      // State to hold error messages

  useEffect(() => {                                            // Fetch user details when the component mounts
    fetch(api_base_url + '/getUserDetails', {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId")  // Fetching user ID from local storage
      })
    }).then(res => res.json()).then(data => {
      if (data.success) {
        setData(data.user);  // Set user data if the request is successful
      }
      else {
        setError(data.message);  // Set error message if the request fails
      }
    })
  }, [])


  const logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    window.location.reload();
  }


  return (
    <>
      <div className="navbar flex items-center  justify-between px-[100px] h-[80px] bg-[#2c2c2cbb]">
        <div className="logo !ml-[80px] flex items-center w-[150px] cursor-pointer  h-[55px]">
          <img  className='w-[112%]' src={logo} alt="" />
        </div>
        <div className="links flex items-center gap-5 mr-20  w-[400px]">
          <Link>Home</Link>
          <Link>About</Link>
          <Link>Contact</Link>
          <Link>Services</Link>
          <Avatar onClick={() => { toggleClass(".dropDownNavbar", "hidden") }} name={data ? data.name : " "} size="40" round="50%" className='cursor-pointer ml-2 ' />
        </div>

        <div className='dropDownNavbar hidden absolute right-[60px] top-[70px] shadow-lg shadow-black/50 !p-[15px] rounded-lg w-[150px] h-[190px] bg-[#141416] ' >
          <div className=' !py-[10px]  border-b-[2px] border-b-[#fff] ' >
            <h3 className=' text-[17px] ' style={{ lineHeight: 1 }} >{data ? data.name : " "}</h3>
          </div>
          <i className='flex items-center gap-2 !mt-3 !mb-2 '  ><MdLightMode className='text-[20px]' />Light Mode</i>
          <i onClick={() => setIsGridLayout(!isGridLayout)} className='flex items-center gap-2 !mt-3 !mb-2 cursor-pointer '  ><BsFillGridFill className='text-[20px]' />{isGridLayout ? "List" : "Grid"} layout</i>
          <button onClick={logout} className='btnBlue !bg-red-500 min-w-[120px] !p-[0px] !pb-[3px] !mt-2 hover:!bg-red-600'>Logout</button>
        </div>
      </div>

    </>
  )
}

export default Navbar
