import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {

  const [formData,setFormData]=useState({
    email: "",
    password: ""
  })
  const navigate=useNavigate();

  const formDataHandler=async(e)=>{
    e.preventDefault();
    const res=await axios.post(`http://localhost:3636/user/login`,formData);
    console.log(`>>>>>>>>res>>>>>>`,res.data);

    
    if(formData.email&&formData.password){
      navigate("/");
      alert("login successfully")
      navigate("/dashboard")
    }
  }

  const formHandler=(e)=>{
   setFormData({
     ...formData,
    [e.target.name]: e.target.value
   })
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">

      <form 
        onSubmit={formDataHandler}
        className="bg-white/80 backdrop-blur-md p-10 rounded-2xl shadow-2xl w-[90%] max-w-md space-y-6 border border-white"
      >

        <h2 className="text-3xl font-extrabold text-center text-gray-800 tracking-wide">
         User Login
        </h2>

        <input 
          type="email" 
          placeholder='Email Address'
          onChange={formHandler}
          value={formData.email}
          name='email'
          className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none 
          focus:ring-2 focus:ring-purple-500 transition shadow-sm"
        />

        <input 
          type="password" 
          placeholder='Password'
          onChange={formHandler}
          value={formData.password}
          name='password'
          className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none 
          focus:ring-2 focus:ring-purple-500 transition shadow-sm"
        />

        <button 
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl 
          text-lg font-semibold shadow-md hover:shadow-xl hover:scale-[1.02] transition-all"
        >
          login
        </button>

        <Link 
          to="/signup"
          className="w-full block text-center bg-gray-800 text-white py-3 rounded-xl 
          hover:bg-gray-900 transition-all shadow"
        >
          Signup
        </Link>

      </form>
    </div>
  )
}

export default Login
