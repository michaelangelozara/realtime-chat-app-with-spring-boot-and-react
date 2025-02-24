import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Registration = () => {
  const [username, setUsername] = useState < string | null | number > (null);
  const navigate = useNavigate();

  const registerUserName = () => {
    if (username) {
      navigate(`/public-chat-room/${username}`)
    }
  }
  return (
    <div className='w-1/4 h-96 min-w-74 border border-gray-400 rounded-2xl flex flex-col justify-center
      p-2 space-y-7
    '>
      <div className='flex justify-center'>
        <h1 className='font-bold'>Register your username</h1>
      </div>
      <div className='flex items-center space-x-3 min-w-74'>
        <h1>Username :</h1>
        <input type="text" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)} className='border border-gray-400 rounded-md h-8 pl-2' />
      </div>
      <div className='flex justify-center'>
        <button onClick={registerUserName} className='w-1/2 h-7 rounded-md bg-green-400 hover:text-white'>Join</button>
      </div>
    </div>
  )
}

export default Registration