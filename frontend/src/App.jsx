import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import NoPage from './pages/NoPage';
import SignUp from './pages/SignUp';
import Login from './pages/login';
import Edittor from './pages/Edittor';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NoPage />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/editor/:projectID" element={<Edittor />} />
        </Routes>
      </BrowserRouter>
    </>

  )
}

export default App
