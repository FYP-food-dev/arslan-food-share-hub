import React from 'react'
import Login from './Login'

export const Signup = () => {
    const [username, setUsername] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [confirmPassword, setConfirmPassword] = React.useState('')
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
        <div className='w-full max-w-md bg-white rounded-2x1 shadow-2x1 p-8'>
            <h1 className='text-center font-bold text-3xl'>Signup Form</h1>
            <form className="space-y-5 mt-8">
              <div><label className=" block text-sm text-gray-700 font-medium mb-2 " >Username</label><input type="text" placeholder='Enter your username' className='w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring focus:ring-green-500 transition' value={username} onChange={(e) => setUsername(e.target.value)} /></div>
              <div><label className=" block text-sm text-gray-700 font-medium mb-2 " >Email</label><input type="email" placeholder='Enter your email' className='w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring focus:ring-green-500 transition' value={email} onChange={(e) => setEmail(e.target.value)} /></div>
              <div><label className=" block text-sm text-gray-700 font-medium mb-2 " >Password</label><input type="password" placeholder='Enter your password' className='w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring focus:ring-green-500 transition' value={password} onChange={(e) => setPassword(e.target.value)} /></div>
              <div><label className=" block text-sm text-gray-700 font-medium mb-2 " >Confirm Password</label><input type="password" placeholder='Confirm your password' className='w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring focus:ring-green-500 transition' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} /></div>
              <button type="submit" className='w-full bg-green-500 text-white font-medium py-3 rounded-lg hover:bg-green-600 transition'>Signup</button>
              
            </form>
        </div>
    </div>
  )
}
