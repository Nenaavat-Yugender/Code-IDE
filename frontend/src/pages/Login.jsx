import React from 'react'
import logo from '../images/logo.png'
import Image from '../images/authPageSide.png'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api_base_url } from '../helper';

const Login = () => {
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");      //pwd = psssword 
    const [error, setError] = useState("");                             // State to hold error messages during signing up, if any
    const navigate = useNavigate();                                       //defining navigate , useNavigate is a hook provided by react-router-dom

    const submitForm = (e) => {
        e.preventDefault();
        fetch(api_base_url + '/Login', {
            mode: "cors",
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: pwd
            })
        }).then((res) => res.json()).then((data) => {
            if (data.success === true) {
                localStorage.setItem("token", data.token);                                  // Store the token in local storage
                localStorage.setItem("isLoggedIn", true);                                       // Set the login status
                localStorage.setItem("userId", data.userId);                                   // Store the user ID in local storage
                alert("Login successful");
                window.location.href = "/";                // Redirect to the home page after successful login
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
                    <img className='w-[250px] !ml-[80px] ' src={logo} alt="" />
                    <form onSubmit={submitForm} className='w-full mt-[60px] ml-[60px] marginForm' action="">
                        <div className="inputBox">
                            <input type="text" required onChange={(e) => { setEmail(e.target.value) }} value={email} placeholder='email' />
                        </div>
                        <div className="inputBox">
                            <input type="password" required onChange={(e) => { setPwd(e.target.value) }} value={pwd} placeholder='Password' />
                        </div>
                        <p className='text-[gray]'>Don't have an account <Link to="/SignUp" className='text-[#00AEEF]'>Sign up</Link></p>
                        <p className='text-red-500 text-[14px] !my-2' >{error}</p>
                        <button className='btnBlue w-[100%] mt-[20px] marginButton' >Login</button>
                    </form>
                </div>

                <div className="right w-[55%]">
                    <img className='h-[100vh] w-[100%] object-cover ' src={Image} alt="" />
                </div>
            </div>
        </>
    )
}

export default Login
