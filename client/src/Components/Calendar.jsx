import React from 'react'
import calendar from "../assets/calendar.png"
const Calendar = () => {
  return (
    <div className='flex flex-row items-center space-x-2'>
        <img src={calendar} className='h-6 w-6' />
        <p className='opacity-60'>Calendar</p>
    </div>
  )
}

export default Calendar