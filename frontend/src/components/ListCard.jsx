import React, { useState } from 'react'
import img from '../images/code.png'
import deleteimg from '../images/delete.png'
import { api_base_url } from '../helper';
import { use } from 'react';
import { useNavigate } from 'react-router-dom';  // Importing useNavigate hook for navigation

const ListCard = ({item}) => {
  const [isDeleteModelShow, setIsDeleteModelShow] = useState(false);

  const navigate = useNavigate();  // Using useNavigate hook to programmatically navigate

  const deleteProj = (id) =>{
    fetch(api_base_url + '/deleteProject', {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        projectId: id,                                      // Sending the project ID to the server for deletion
        userId: localStorage.getItem("userId")  // Fetching user ID from local storage
      })
    }).then(res => res.json()).then(data => {
      if (data.success) {                                        //data.success is true
        alert("Project deleted successfully");
        window.location.reload();  // Reload the page to reflect changes
      } else {
        alert(data.message);  // Show error message if deletion fails
        setIsDeleteModelShow(false);  // Hide the delete confirmation modal
      }
    });
  }

  return (
    <>
      <div className="listCard !mb-[20px] flex items-center justify-between rounded w-[full] p-[10px] bg-[#141416] cursor-pointer shadow-lg shadow-black/100 hover:shadow-white/20 ">
        <div onClick={() => { navigate(`/editor/${item._id}`) }} className=" flex items-center gap-2 ">
          <img className='w-[80px] !ml-[10px]' src={img} alt="" />
          <div>
            <h3 className='text-[22px]'>{item.title}</h3>
            <p className='text-[rgb(128,128,128)] text-[14px]' >created on {new Date(item.date).toDateString()}</p>
          </div>
        </div>
        <div>
          <img className='w-[30px] cursor-pointer !mr-[25px]' onClick={() => {setIsDeleteModelShow(true)}} src={deleteimg} alt="" />
        </div>
      </div>

      {      // Conditional rendering for the delete model, using turnery operator
        isDeleteModelShow ?
          (< div className="model fixed top-0 left-0 w-screen h-screen bg-[rgb(0,0,0,0.5)] flex justify-center items-center flex-col ">
            <div className="minModel w-[25vw] h-[27vh] bg-[#141414] rounded-xl !p-[20px] ">
              <h3 className='text-3xl' >Do You Want To Delete <br /> This Project</h3>
              <div className='flex w-full items-center gap-[10px] !mt-5'>
                <button onClick={()=>{deleteProj(item._id)}} className='!p-[7px]  rounded-lg text-white cursor-pointer min-w-[49%] bg-[#FF4343] text-[19px] ' >Delete</button>
                <button onClick={() => {setIsDeleteModelShow(false)}} className='!p-[7px] rounded-lg text-white cursor-pointer min-w-[49%]  bg-[#1A1919] text-[19px] ' >Cancel</button>
              </div>

            </div>
          </div>)

        : ("") 
      }


    </>
  )
}

      export default ListCard
