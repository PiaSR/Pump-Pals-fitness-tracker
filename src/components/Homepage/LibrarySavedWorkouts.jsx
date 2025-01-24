import React, {useState} from 'react'
import { useWorkout } from '../../contexts/workoutContexts/workoutContext'
import NewWorkout from '../Workouts/NewWorkout'
import { useAuth } from '/src/contexts/authContexts/authContext'
import { MdOutlineKeyboardArrowRight } from "react-icons/md";





export function LibrarySavedWorkouts ({ selectedWorkout, handleShowCompletedWorkout, handleStartWorkoutBtn}) {

const {currentUser} = useAuth()
const {workoutCollection, setAddedExerciseObjects, startNewWorkout} = useWorkout()


  return (
	<div className='flex justify-center items-center flex-col pt-6 h-[85%] w-[100dvw] sm:w-[80dvw] md:w-[70dvw] lg:max-w-4xl  bg-bg-white bg-opacity-60 sm:rounded-t-3xl  '>
     
    
    <div className='flex flex-col items-center w-10/12 md:w-9/12 h-full   '>
    <h3 className=' text-2xl my-6 pl-6 text-gray-800 self-start'>{`${currentUser.displayName}'s Library`}</h3>
        
        <div className='overflow-y-auto overflow-x-hidden flex w-full '>
          {workoutCollection.length>0 ? (
            <ul className='w-full min-w-[320px]'>
          {workoutCollection.map((workout)=> (
            <li
            key={workout.id}
            className="p-1 sm:p-3 flex flex-col "
            onClick={()=>handleShowCompletedWorkout(workout)}
            >
              <div className='text-md text-gray-700 px-8 py-6  flex justify-between'>
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
          <button 
          className='btn-secondary w-[85%] text-sm justify-self-end mb-2'
          onClick={()=>handleStartWorkoutBtn()}>
            Start New Workout
            </button> 
        </div> 
        
          
        
    
  </div>
 
  )
}

