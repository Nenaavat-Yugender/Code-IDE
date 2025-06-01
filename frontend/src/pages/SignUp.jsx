import React from 'react'
import logo from '../images/logo.png'
import Image from '../images/authPageSide.png'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api_base_url } from '../helper';
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";

const SignUp = () => {
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");      //pwd = psssword 
    const [isPasswordShow, setIsPasswordShow] = useState(false); // State to toggle password visibility

    const [error, setError] = useState("");                             // State to hold error messages during signing up, if any

    const navigate = useNavigate();                                       //defining navigate , useNavigate is a hook provided by react-router-dom

    const submitForm = (e) => {
        e.preventDefault();
        fetch(api_base_url + "/signUp", {
            mode: "cors",
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                name: name,
                email: email,
                password: pwd
            })
        }).then((res) => res.json()).then((data) => {
            if (data.success === true) {
                alert("Account created successfully");
                navigate("/login");
            }
            else {
                setError(data.message);
            }
        })
    }

    return (
        <>
            <div className='container max-w-[100%] min-h-screen flex items-center justify-between pl-[100px]'>
                <div className="!ml-[100px] w-[30%]" >
                    <img className='w-[200px]' src={logo} alt="" />
                    <form onSubmit={submitForm} className='w-full mt-[60px] ml-[60px] marginForm' action="">
                        <div className="inputBox">
                            <input type="text" required onChange={(e) => { setUsername(e.target.value) }} value={username} id='username' placeholder='username' />
                        </div>
                        <div className="inputBox">
                            <input type="text" required onChange={(e) => { setName(e.target.value) }} value={name} id='name' placeholder='name' />
                        </div>
                        <div className="inputBox">
                            <input type="email" required onChange={(e) => { setEmail(e.target.value) }} value={email} id='email' placeholder='email' />
                        </div>
                        <div className="inputBox">
                            <input type={isPasswordShow ? "text" : "password" }required onChange={(e) => { setPwd(e.target.value) }} value={pwd} id='Password' placeholder='Password' />
                            <i className={`text-[25px] !mr-[10px] ${isPasswordShow ? 'text-white' : 'text-[gray]'} cursor-pointer`} onClick={() => { setIsPasswordShow(!isPasswordShow) }} >{isPasswordShow ? <IoIosEye /> : <IoIosEyeOff />}</i>
                        </div>
                        
                        <p className=''>Already have an account <Link to="/login" className='text-[#00AEEF]'>login</Link></p>

                        <p className='text-red-500 text-[14px] !my-2' >{error}</p>

                        <button className='btnBlue w-[100%] mt-[20px] marginButton' >Sign up</button>
                    </form>
                </div>
                <div className="right w-[55%]">
                    <img className='h-[100vh] w-[100%] object-cover' src={Image} alt="" />
                </div>
            </div>
        </>
    )
}

export default SignUp
