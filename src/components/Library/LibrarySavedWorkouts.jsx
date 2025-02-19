import React, {useEffect} from 'react'
import { useWorkout } from '../../contexts/workoutContexts/workoutContext'
import { useAuth } from '/src/contexts/authContexts/authContext'
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from 'react-router-dom';





export function LibrarySavedWorkouts ({  handleShowCompletedWorkout, handleStartWorkoutBtn}) {

const {currentUser} = useAuth()
const {workoutCollection} = useWorkout()
const navigate = useNavigate()

useEffect(() => {
  if (!currentUser) {
    navigate("/login")
  }
}, [currentUser, navigate])


if (!currentUser) return null 

  return (
    // <div className='flex flex-col justify-evenly w-full h-full lg:max-w-4xl sm:h-[90dvh] sm:rounded-3xl '>
     
 <div className='flex flex-col items-center w-full md:w-9/12 h-full   '>
        <div className='self-start bg-orange w-full rounded-b-md'>
        <h3 className='text-2xl my-12  pl-9 sm:pl-11 text-white '>
          {currentUser?.displayName 
            ? `${currentUser.displayName.charAt(0).toUpperCase()}${currentUser.displayName.slice(1)}'s Library`
            : "User's Library"}
        </h3>
        </div>
        
        <div className='overflow-y-auto overflow-x-hidden flex w-full '>
          {workoutCollection.length>0 ? (
            <ul className='w-full min-w-[320px]'>
          {workoutCollection
          .sort((a,b)=> new Date(b.addedAtFormatted) - new Date (a.addedAtFormatted))
          .map((workout)=> (
            <li
            key={workout.id}
            className="p-1 sm:p-3 flex flex-col "
            onClick={()=>handleShowCompletedWorkout(workout)}
            >
              <div className='text-md text-gray-700 px-12 py-8 flex justify-between'>
              {`${workout.workoutTitle} on ${workout.addedAtFormatted}`}
              <MdOutlineKeyboardArrowRight className='text-xl' />

              </div>
              <hr className='border-solid border-gray-200 w-full justify-self-end'/>
            </li>
          ))}
          </ul>
          ) : (
            <p>No workouts found. Start a new workout!</p>
          )}
          </div>
         
        </div>        
    
  // </div>
 
  )
}

