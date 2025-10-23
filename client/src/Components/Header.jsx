import React from 'react'
import gear from "../assets/gear.png"
import bell from "../assets/bell.png"
import user from "../assets/user.png"

const Header = () => {
  return (
  <div className="flex flex-row w-full p-10 space-x-6 justify-end items-center">
  <img src={gear} className='w-5 h-5 border border-gray-500 rounded-4xl  bg-gray-600 '/>
  <img src={bell} className='invert-150 w-5 h-5 border border-gray-500 rounded-4xl  bg-gray-600 '/>
  <img src={user} className='w-6 h-6' />
</div>


  )
}

export default Header