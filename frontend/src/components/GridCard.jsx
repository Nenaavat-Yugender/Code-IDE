import React, { useState } from 'react'
import codeImg from '../images/code.png'
import deleteImg from '../images/delete.png'

const GridCard = () => {
const [isDeleteModelShow, setIsDeleteModelShow] = useState(false);  

  return (
    <>
      <div className="gridCard bg-[#141416] !p-[15px] w-[270px] h-[180px] cursor-pointer  hover:shadow-white/20 rounded-lg shadow-lg shadow-black/100 ">
        <img className='w-[80px]' src={codeImg} alt="" />
        <p className=' text-[20px] w-[90%] line-clamp-1 '>My First Project  yugender yugender </p>
        <div className=' flex items-center justify-between '>
          <p className=' text-[14px] text-[gray] ' >created in 9 mon 2024</p>
          <img className=' w-[30px] cursor-pointer ' onClick={() => {setIsDeleteModelShow(true)}} src={deleteImg} alt="" />
        </div>
      </div>

       {      // Conditional rendering for the delete model, using turnery operator
        isDeleteModelShow ?
          (< div className="model fixed top-0 left-0 w-screen h-screen bg-[rgb(0,0,0,0.5)] flex justify-center items-center flex-col ">
            <div className="minModel w-[25vw] h-[27vh] bg-[#141414] rounded-xl !p-[20px] ">
              <h3 className='text-3xl' >Do You Want To Delete <br /> This Project</h3>
              <div className='flex w-full items-center gap-[10px] !mt-5'>
                <button className='!p-[7px]  rounded-lg text-white cursor-pointer min-w-[49%] bg-[#FF4343] text-[19px] ' >Delete</button>
                <button onClick={() => {setIsDeleteModelShow(false)}} className='!p-[7px] rounded-lg text-white cursor-pointer min-w-[49%]  bg-[#1A1919] text-[19px] ' >Cancel</button>
              </div>

            </div>
          </div>)

        : ("") 
      }

    </>
  )
}

export default GridCard