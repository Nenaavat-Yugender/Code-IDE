import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import ListCard from '../components/ListCard'
import GridCard from '../components/GridCard'
import { api_base_url } from '../helper'
import { useNavigate } from 'react-router-dom';  // Importing useNavigate hook for navigation

const Home = () => {
  const [isGridLayout, setIsGridLayout] = useState(false);
  const [isCreateModelShow, setIsCreateModelShow] = useState(false);

  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [projectTitle, setProjectTitle] = useState("");                // State to hold the project title for the new project

  const [data, setData] = useState(null)                                  // State to hold user data fetched from the server
  const [error, setError] = useState("")                                   // State to hold error messages during fetching user details, if any

  const navigate = useNavigate();                                         // Using useNavigate hook to programmatically navigate  


  // Filter data based on search query
  const filteredData = data ? data.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) // Case insensitive filtering
  ) : [];


  // Function to create a new project
  const createProj = (e) => {
    if (projectTitle === " ") {
      alert("Please enter a project title");
      return;
    }
    else {
      fetch(api_base_url + '/createProject', {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: projectTitle,                            // Sending the project title to the server
          userId: localStorage.getItem("userId")               // Fetching user ID from local storage
        })
      }).then(res => res.json()).then(data => {
        if (data.success) {
          setIsCreateModelShow(false);              // Hide the modal after successful creation
          setProjectTitle(" ");                      // Reset the project title input
          alert("Project created successfully");
          navigate(`/editor/${data.projectId}`);                     // Navigate to the editor page with the new project ID
        }
        else {
          alert("Something went Wrong");                             // Show error message if creation fails
        }
      });
    }
  }

  // Function to fetch projects created by the user
  const getProj = () => {
    fetch(api_base_url + '/getProjects', {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId"),  // Fetching user ID from local storage
      })
    }).then(res => res.json()).then(data => {
      if (data.success) {
        console.log("Fetched data:", data);
        setData(data.projects);  // Set the fetched projects to state
      }
      else {
        setError(data.message);  // Set error message if fetching fails
      }
    }).catch(err => {
      console.error("Fetch error:", err.message);
      setError("Something went wrong while fetching projects.");
    });
  };

  // useEffect hook to fetch projects when the component mounts
  useEffect(() => {
    getProj();
  }, []);


  //sate to show user name on home page 
  const [userData, setUserDate] = useState(null);                          // State to hold user data
  const [userError, setUserError] = useState("");                      // State to hold error messages

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
        setUserDate(data.user);  // Set user data if the request is successful
      }
      else {
        setUserError(data.message);  // Set error message if the request fails
      }
    })
  }, [])



  return (
    <>
      <Navbar isGridLayout={isGridLayout} setIsGridLayout={setIsGridLayout} />

      <div className="flex items-center justify-between !px-[100px] !my-[40px]"> {/* px = paddong in x, my = margin in y */}
        <h2 className='text-2xl ' >Hi, {userData ? userData.userName : userError } <span className=' animate-pulse ' >👋</span> </h2>
        <div className="flex items-center gap-1">
          {/* Search Bar */}
          <div className="inputBox !w-[350px]">
            <input
              type="text"
              placeholder='Search Here... !'
              value={searchQuery} // Bind search input to searchQuery state
              onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery on input change
            />          </div>
          <button onClick={() => { setIsCreateModelShow(true) }} className='btnBlue rounded-[5px] !mb-4 !text-[31px] !p-0 w-[50px] '>+</button>

        </div>
      </div>

      {/* Project Display */}
      <div className="cards">
        {
          isGridLayout ?
            (<div className="grid !px-[100px]">

              {
                filteredData && filteredData.length > 0 ? filteredData.map((item, index) => {
                  return <GridCard key={index} item={item} />
                }) : <div className="flex flex-col items-center justify-center h-60 text-gray-500 ">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
                    alt="No Projects"
                    className="w-24 h-24 mb-4 opacity-70 animate-bounce"
                  />
                  <p className="text-xl font-medium">No Projects Found</p>
                  <p className="text-sm text-gray-400">Start by creating a new project!</p>
                </div>
              }

            </div>) : (<div className="list !px-[100px]">

              {
                filteredData && filteredData.length > 0 ? filteredData.map((item, index) => {
                  return <ListCard key={index} item={item} />
                }) : <div className="flex flex-col items-center justify-center h-60 text-gray-500 ">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
                    alt="No Projects"
                    className="w-24 h-24 mb-4 opacity-70 animate-bounce"
                  />
                  <p className="text-xl font-medium">No Projects Found</p>
                  <p className="text-sm text-gray-400">Start by creating a new project!</p>
                </div>
              }

            </div>)
        }
      </div>

      {/* Modal for Creating a New Project */}
      {
        isCreateModelShow ? (<div className="createModelCon fixed top-0 left-0 right-0 bottom-0 w-screen h-screen bg-[rgb(0,0,0,0.4)] flex items-center justify-center">
          <div className="createModel w-[25vw] h-[29vh] shadow-lg shadow-black/50 bg-[#141414] rounded-[10px] !p-[20px]">
            <h3 className='text-2xl' >Create New Project</h3>

            <div className="inputBox !bg-[#202020] !mt-4">
              <input onChange={(e) => { setProjectTitle(e.target.value) }} value={projectTitle} type="text" placeholder='Project Title' />
            </div>

            <div className='flex items-center gap-[10px] w-full !mt-2' >
              <button onClick={createProj} className='btnBlue rounded-[5px] w-[49%] !mb-4 !p-[5px] !px-[10px] !py-[10px]'>Create</button>
              <button onClick={() => { setIsCreateModelShow(false) }} className='btnBlue !bg-[#1A1919] rounded-[5px] !mb-4 w-[49%] !p-[5px] !px-[10px] !py-[10px]'>Cancel</button>
            </div>
          </div>
        </div>) : ("")
      }


    </>
  )
}

export default Home
