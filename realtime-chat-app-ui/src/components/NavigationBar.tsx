import React from 'react'
import { Outlet } from 'react-router-dom'

const NavigationBar = () => {
  return (
    <div className='w-full flex flex-col items-center space-y-5'>
      <div className='w-full h-20 bg-red-400 flex justify-center items-center'>
        <h1 className='text-2xl text-white'>Welcome To Free Public Chat App</h1>
      </div>
      <Outlet />
    </div>
  )
}

export default NavigationBar