import React, { useContext } from 'react'
import {Link, useNavigate} from "react-router-dom";
import  {Eye, LogIn} from 'lucide-react';
import { useState } from 'react';
import axios from "axios"
import  {UseAuth } from '../contest/Authprovider';

const Login = () => {
    const [formData,setFormData]=useState({
        email:"",
        password:""});

    const [error,setError] = useState("");
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();
    const {setAuthUser} = UseAuth();

    const handleChange=(e)=>{
      const value = e.target.value;
      const name = e.target.name;
      setFormData({...formData,[name]:value})
    }
    const handleKeyDown=(e)=>{
      if(e.key==="Enter"){
          handleSignup();
      }
    }

    const handleSignup = async()=>{
      setLoading(true)
        try {
         const {data}= await axios.post(`https://deep-seek-clone-t27x.onrender.com/api/v1/user/login`,{
            
            email:formData.email,
            password:formData.password
          },{
            withCredentials:true,
          })
          
          alert(data.message||"Login sucessfully");
          localStorage.setItem("user",JSON.stringify(data.user))
          localStorage.setItem("token", data.token)
          setAuthUser(data.token)

          navigate("/")
            
        } catch (error) {
          const msg=error?.response?.data?.error|| "login Failed"
          setError(msg)
        }
        finally{
            setLoading(false)
        }
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
     <div className= "bg-[#1e1e1e] text-white w-full max-w-md rounded-2xl p-6 shadow-lg">
        <h1 className="text-white items-center justify-center text-center">Login</h1>
     
     
     
    {/* Email */}
    <div  className="mb-4 mt-2"> 
    <input
            className="w-full bg-transparent border border-gray-600 rounded-md px-4 py-3 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#7a6ff0]"
            type="text"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            
          />
    </div>
    {/* password */}
    <div  className="mb-4 mt-2 relative">
    <input
      className="w-full bg-transparent border border-gray-600 rounded-md px-4 py-3 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#7a6ff0]"
      type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange} 
        onKeyDown={handleKeyDown}
          />
          
     <span className=" absolute right-3 top-3 text-gray-400">
            {" "}
      <Eye size={18}/>{" "}
    </span>
    </div>
    {/* error message */}
    {error && <span className="text-red-600 text-sm mb-4">{error}</span>}
    {/* term and condition */}
    <p className="text-xs text-gray-400 mt-4 mb-6">
        By signing up or logging in, you consent to DeepSeek's{" "}
        <a className="underline" href="">
            Terms of Use
          </a>{" "}
          and{" "}
          <a className=" underline" href="">
            Privacy Policy
          </a>{" "}
          .
          </p>
    {/* signup */}
    <button onClick={handleSignup}
     disabled={loading}
     className=" w-full bg-[#7a6ff6] hover:bg-[#6c61a6] text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
     >
      {loading?"Logging in...":"Login"}
      </button>
    {/* links */}
    <div className="flex justify-between mt-4 text-sm">
    <a className="text-[#7a6ff6] hover:underline" href="">
            Not registered?
          </a>
         <Link className="text-[#7a6ff6] hover:underline" to='/signup'>
         Signup
         </Link>
    </div>

    
    </div>

    </div>
  )}



export default Login
