import React from 'react'
import Profile from '../components/Auth/Profile.jsx'
import Navbar from '/src/components/Common/Navbar'

const ProfilePage = () => {
  
  return (
    <div className='flex flex-col justify-evenly w-[100dvw]  h-[100dvh] sm:w-[80dvw] md:w-[70dvw] lg:max-w-4xl sm:h-[90dvh] p-3 sm:rounded-3xl '>
	  <Profile />
    <Navbar />
    </div>
  )
}

export default ProfilePage