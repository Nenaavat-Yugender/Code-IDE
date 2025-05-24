import React from 'react'
import logo from '../images/logo.png'
import Image from '../images/authPageSide.png'
import {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");      //pwd = psssword 

    const submitForm = (e)=>{
        e.preventdefault();
    }
    return (
        <>
            <div className='container max-w-[100%] min-h-screen flex items-center justify-between pl-[100px]'>
                <div className="!ml-[100px] w-[30%]" >
                    <img className='w-[200px]' src={logo} alt="" />
                    <form onSubmit={submitForm} className='w-full mt-[60px] ml-[60px] marginForm'  action="">
                        <div className="inputBox">
                            <input type="text" required onChange={(e)=>{setUsername(e.target.value)}} value={username} placeholder='username' />
                        </div>
                        <div className="inputBox">
                            <input type="text"  required onChange={(e)=>{setName(e.target.value)}} value={name} placeholder='name' />
                        </div>
                        <div className="inputBox">
                            <input type="text" required onChange={(e)=>{setEmail(e.target.value)}} value={email} placeholder='email' />
                        </div>
                        <div className="inputBox">
                            <input type="text" required onChange={(e)=>{setPwd(e.target.value)}} value={pwd} placeholder='Password' />
                        </div>
                        <p className='text-[gray]'>Already have an account <Link to="/login" className='text-[#00AEEF]'>login</Link></p>
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
