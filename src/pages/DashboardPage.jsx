import React, {useState} from 'react'
import LoadingScreen from '../components/Common/LoadingScreen'
import Navbar from '/src/components/Common/Navbar'
import DashboardAnimation from '../components/Dashboard/DashboardAnimation'
import { useAuth } from '../contexts/authContexts/authContext'
import { IoMdSunny } from "react-icons/io";
import { BsFillMoonStarsFill } from "react-icons/bs";
import ExerciseCarousel from '../components/Dashboard/ExerciseCarousel'
import { useExercise } from '../contexts/workoutContexts/exerciseContext'
import RoutinesCarousel from '../components/Dashboard/RoutinesCarousel'



const DashboardPage = () => {
  const {currentUser} = useAuth()
  const {favorites} = useExercise()
  const [currentDate, setCurrentDate] = useState(getDate());
  const [isDaytime, setIsDaytime] = useState(checkDaytime());

  function getDate() {
    const today = new Date()
    const month = today.toLocaleString('default', { month: 'short' })
    const date = today.getDate()
    const day = today.toLocaleString('locale', { weekday: 'short' })
    return `${day} ${date} ${month}`
  }
  function checkDaytime() {
    const hour = new Date().getHours();
    return hour >= 6 && hour < 18; // Daytime: 6 AM - 5:59 PM
  }
 

  return (
	<div className='flex flex-col justify-evenly w-[100dvw]  h-[100dvh] sm:w-[80dvw] md:w-[70dvw] lg:max-w-4xl sm:h-[90dvh] p-3 sm:rounded-3xl '>
    
    {/* HEADER */}
    <div className='background-gradient w-full max-w-lg p-5 rounded-md flex justify-between items-center'>
      <div className='mt-5 ml-5'>
        <div className='text-gray-400 flex gap-2'>
        
       {isDaytime ? <IoMdSunny size={14} /> : <BsFillMoonStarsFill size={14} />}
        <p className='text-xs font-semibold  mb-3'>{currentDate.toUpperCase()}</p>

        </div>
        <div className='flex flex-wrap items-start'>
          <h3 className='text-gray-500'>Hello,&nbsp;</h3>
          <h3 className='text-gray-900 break-all'>{currentUser.displayName}</h3>
        </div>
        
      </div>
      
      <DashboardAnimation />
    </div>
    

          <h4 className='text-gray-700 text-md font-bold self-start p-4'>ROUTINES</h4>
          <div className="w-full max-w-screen-md md:max-w-[90%] mx-auto">
          <RoutinesCarousel bgColor='bg-orange'/>
          </div>

    
          <h4 className='text-gray-700 text-md font-bold self-start p-4 mt-2'>EXERCISES</h4>
          <div className="w-full max-w-screen-md md:max-w-[90%] mx-auto">

          <ExerciseCarousel bgColor='bg-bg-primary'/>
          </div>

  
      <div className='justify-self-end p-0'>
      <Navbar />
      </div>
      
    </div>
  )
}

export default DashboardPage