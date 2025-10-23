import React from 'react'
import message from "../assets/message.png"
const Messages = () => {
  return (
    <div className='flex flex-row items-center space-x-2'>
        <img src={message} className='w-6 h-6' />
        <p className='opacity-60'>Messages</p>
    </div>
  )
}

export default Messages