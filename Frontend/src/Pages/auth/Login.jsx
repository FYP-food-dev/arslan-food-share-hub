import React,{useContext, useState} from "react";
import { loginUser } from "../../services/authServices";
import {FaEye,FaEyeSlash} from "react-icons/fa";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const {setRole,setUser,setActiveRole}=useContext(AuthContext)
  const [showPassword,setShowPassword]=useState(false)
  const [showLoading, setShowLoading]= useState(false)
  const [formData,setFormData]=useState({
    email:"",
    password:""
  })

   function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }
    function resetForm() {
        setFormData({
            email: "",
            password: "",
        });
    }
  function validateForm(){
  const  values=Object.values(formData)
  const isEmpty=values.some((value)=>value.trim()=== "")
  if(isEmpty){
    toast.error("Please fill the Fields")  
    return false
   }
  return true
  }
 async function handleSubmit(e){
      e.preventDefault()

      if(!validateForm()){
        return;
      } 
      setShowLoading(true)
    try{
      const result=await loginUser(formData)
      console.log(result)
      if(result.success){

        const user=result.data.user
        const roles=result.data.roles
        setUser(user)
        setRole(roles)
        localStorage.setItem("user",JSON.stringify( user))
        localStorage.setItem("role",JSON.stringify( roles))
        localStorage.setItem("access",result.data.access)
        localStorage.setItem("refresh",result.data.refresh)
        console.log(roles.length)
        if (roles.length===1){
        const  role=roles[0]
        setActiveRole(role)
        localStorage.setItem("activeRole",role)
          navigate(`/${role.toLowerCase()}`);
        }
       else if (roles.length > 1) {

        navigate("/choose-role");
    }

        
        toast.success("Login Success")
        resetForm()
        return
      }
      if(result.status==400){
          const firsterror=Object.values(result.data)[0][0]
          toast.error(firsterror)
          return;
      }
      if(result.status===null){
        toast.error(result.error)
        return
      }
      if(result.status>=500){
        toast.error("Something went wrong on the server")
         return
      }
      toast.error("Something went wrong, Try Again")
      
    }
    finally{
       setShowLoading(false)
    }

  
  }
  console.log(formData)
  return (
    <div className='min-h-screen flex justify-center items-center px-4 bg-gray-100'>
      <div className='w-full max-w-md shadow-2xl rounded-2xl p-5'>
        <h1 className='font-bold text-3xl text-center mb-5 '>Login Form</h1>
        <form onSubmit={handleSubmit} className='space-y-6' >
            <div>
            <label className='text-gray-700 block font-medium text-sm mb-2'>Email</label>
            <input 
            type="email"
            placeholder='Enter your Email'
             name="email"
             value={formData.email}
            className='w-full border border-gray-300 outline-none  px-4 py-3 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition'
            onChange={handleChange}
             />
            </div>

            <div>
            <label className='text-gray-700 block font-medium text-sm mb-2'>Password</label>
            <div className="relative">
            <input
            placeholder='Enter your Password'
             type={showPassword ? "text" : "password"} 
              name="password"
              value={formData.password}
              className='w-full border border-gray-300 outline-none  px-4 py-3 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition'
              onChange={handleChange}
             />
             <button className="absolute right-3 top-1/2 -translate-y-1/2 " type="button" onClick={()=> setShowPassword(!showPassword)}>{showPassword ?<FaEyeSlash/> : <FaEye/>} </button>
            </div>
            </div>
            <div className="relative flex">
                <button className=' w-full  py-3  rounded-lg text-white  bg-green-500 hover:bg-green-600 transition duration-200 font-semibold shadow-md hover:shadow-lg text-center'>
                    {showLoading ? "Logging in..." : "Log in "}
                </button>
                { showLoading &&<div className="absolute right-30 top-1/2 -translate-y-1/2 h-5 w-5 border-4 border-white rounded-full border-t-transparent animate-spin">

                </div>}
            </div>
            
        </form>

      </div>
      
    </div>
  )
}

export default Login