import React from 'react'
import group from "../assets/group.png"
const Employee = () => {
  return (
   <div className='flex flex-row items-center space-x-2'>
    <img src={group} className='w-6 h-6' />
    <p className='opacity-60'>Employee</p>
    </div>
  )
}

export default Employee