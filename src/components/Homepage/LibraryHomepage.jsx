import React, {useState} from 'react'
import { useWorkout } from '../../contexts/workoutContexts/workoutContext'
import NewWorkout from '../Workouts/NewWorkout'
import { useAuth } from '/src/contexts/authContexts/authContext'



export function LibraryHomepage ({ selectedWorkout, handleShowCompletedWorkout}) {

const {currentUser} = useAuth()
const {workoutCollection, setAddedExerciseObjects, startNewWorkout} = useWorkout()


//   get exercise ids to set state (needed if user clicks on Add Exercises -> exercises already in workout should appear as ticked)
// when starting workout, getExObjbyId (only for those that were added new, add to addedExObj array)



  return (
	<div className='flex justify-center items-center flex-col py-6 w-[100dvw]  h-[100dvh] sm:w-[80dvw] md:w-[70dvw] lg:max-w-4xl sm:h-[90dvh] bg-bg-white bg-opacity-60 sm:rounded-3xl  '>
    { !selectedWorkout && (  
    <>
    <div className='flex flex-col w-10/12 md:w-9/12 h-full sm:h-[90%] p-4  '>
    <h3 className=' text-2xl mt-8 text-gray-800 self-start'>{`${currentUser.displayName}'s Library`}</h3>
        
        <div className='overflow-y-auto overflow-x-hidden flex'>
          {workoutCollection.length>0 ? (
            <ul className='w-full min-w-[320px]'>
          {workoutCollection.map((workout)=> (
            <li
            key={workout.id}
            className="p-3 flex flex-col"
            onClick={()=>handleShowCompletedWorkout(workout)}
            >
              <div className='text-sm text-gray-700 px-7 py-4 '>
              {`${workout.workoutTitle} on ${workout.addedAtFormatted}`}
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
        </>)}

        
    
  </div>
 
  )
}

