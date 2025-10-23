import React from 'react'
import dashboard from "../assets/dashboard.png"
const Dashboard = () => {
  return (
    <div className='flex flow-row space-x-1 items-center'>
        <img src={dashboard} className='h-6 w-6' />
        <p className='opacity-60'>Dashboard</p></div>
  )
}

export default Dashboard