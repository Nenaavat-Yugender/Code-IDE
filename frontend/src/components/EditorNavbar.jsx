import React from 'react'
import logo from '../images/logo.png' //importing logo
import { FaDownload } from "react-icons/fa";  //for using download icons

const EditorNavbar = () => {
  return (
    <>
      <div className="EditorNavbar flex items-center  justify-between !px-[100px] h-[80px] bg-[#2c2c2cbb]">
        <div className="logo flex items-center w-[150px] cursor-pointer  h-[55px]">
          <img src={logo} alt="" />
        </div>
        <p>File / <span className='text-[gray]' > My first project</span></p>
        <i className='p-[5px] cursor-pointer rounded-[3px] text-[18px]' > <FaDownload /></i>

      </div>
    </>
  )
}

export default EditorNavbar
