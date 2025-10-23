import React from 'react'
import message from "../assets/message.png"
const Messages = () => {
  return (
    <div className='flex flex-row opacity-50 items-center space-x-2'>
        <img src={message} className='w-6 h-6' />
        <p>Messages</p>
    </div>
  )
}

export default Messages