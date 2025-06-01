import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/Home';
import NoPage from './pages/NoPage';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Edittor from './pages/Edittor';

function App() {
  let isLoggedIn = localStorage.getItem("isLoggedIn") // Check if user is logged in
  return (
    <>
      <BrowserRouter>
        <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/" element={isLoggedIn ?  <Home /> : <Navigate to="/login"/> } />        {/*(making secure root)Home route, redirects to login if not logged in*/}
            <Route path="*" element={isLoggedIn ? <NoPage /> : <Navigate to="/login"/> } />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/editor/:projectID" element={isLoggedIn ? <Edittor /> : <Navigate to="/login"/> } />
        </Routes>
      </BrowserRouter>
    </>

  )
}

export default App
