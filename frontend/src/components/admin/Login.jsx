import React, { useState } from 'react'

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");

  const handleSubmit = (e)=>{
    e.preventDefault();
  }


  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='w-full max-w-sm p-6 max-md:m-6 border border-primary/30 shadow-xl shadow-primary/15 rounded-lg'>
        <div className='flex flex-col items-center justify-center'>
          <div className='flex flex-col items-center justify-center'>
            <h1 className='text-3xl py-6 text-center'> <span className='text-primary font-semibold'>Admin</span> Login</h1>
            <p className='font-light text-center'>Enter your credentials to access the admin panel</p>
          </div>

          <form onSubmit={handleSubmit} className='w-full mt-6 sm:max-w-md text-gray-600'>
              <div className='flex flex-col my-4'>
                <label htmlFor="">Email</label>
                <input onChange={(e)=>setEmail(e.target.value)} value={email} className='py-2 border-b border-gray-300 focus:outline-none' type="email" required placeholder='Enter Your email' />
              </div>
              <div className='flex flex-col my-4'>
                <label htmlFor="">Password</label>
                <input onChange={(e)=> setPassword(e.target.value)} value={password} className='py-2 border-b border-gray-300 focus:outline-none' type="password" required placeholder='Enter Password' />
              </div>
              <button type='submit' className='text-white bg-primary w-full py-3 rounded cursor-pointer font-medium transition-all hover:bg-primary/90'>Login</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login