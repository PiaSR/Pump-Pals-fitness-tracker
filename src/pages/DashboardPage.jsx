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
import { useWorkout } from '../contexts/workoutContexts/workoutContext'



const DashboardPage = () => {
  const {currentUser} = useAuth()
  const {favorites} = useExercise()
  const {templates} = useWorkout()
  // const [currentDate, setCurrentDate] = useState(getDate());
  // const [isDaytime, setIsDaytime] = useState(checkDaytime());

  // function getDate() {
  //   const today = new Date()
  //   const month = today.toLocaleString('default', { month: 'short' })
  //   const date = today.getDate()
  //   const day = today.toLocaleString('locale', { weekday: 'short' })
  //   return `${day} ${date} ${month}`
  // }
  // function checkDaytime() {
  //   const hour = new Date().getHours();
  //   return hour >= 6 && hour < 18; // Daytime: 6 AM - 5:59 PM
  // }
 

  return (
	<div className='flex flex-col  content-center w-[100dvw] max-w-lg h-[100dvh] sm:w-[80dvw] md:w-[70dvw] lg:max-w-4xl sm:h-[90dvh] p-3 sm:rounded-3xl '>
    
    {/* HEADER */}
    <div className='w-full max-w-md p-4 flex flex-col justify-between items-center'>
      <div className='bg-bg-primary h-12'>logo placeholder</div>
        <p className='text-gray-500 text-md self-start py-6'>{currentUser?.displayName 
    ? `${currentUser.displayName[0].toUpperCase()}${currentUser.displayName.slice(1)}, ready to work out?`
    : "Welcome, ready to work out?"
  }</p>
    
      <div className='bg-radial-gradient w-full h-28 rounded-lg'></div>
    </div>
    

          <h4 className='text-gray-700 text-xl font-semibold self-start p-4'>Pump Pal Routines</h4>

        {/* show user's custom or favorited routines if there are any */}
      {templates && templates.length > 0 && 
       <div className="w-full max-w-screen-md md:max-w-[90%] mx-auto">
                <h4 className='text-gray-700 text-xl font-semibold self-start p-4'>My Routines</h4>
                <RoutinesCarousel bgColor='bg-orange'/>
        </div>}
          
        <div className="w-full max-w-screen-md md:max-w-[90%] mx-auto">

          
        </div>


    
      <Navbar className='self-end' />
    
      
    </div>
  )
}

export default DashboardPage




//  <h4 className='text-gray-700 text-md font-bold self-start p-4 mt-2'>EXERCISES</h4>
{/* <div className="w-full max-w-screen-md md:max-w-[90%] mx-auto">

<ExerciseCarousel bgColor='bg-bg-primary'/>
</div> */}