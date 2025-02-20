import React, {useState, useEffect} from 'react'
import {LibrarySavedWorkouts} from '/src/components/Library/LibrarySavedWorkouts'
import { SelectWorkoutOption } from '../components/Library/SelectWorkoutOption'
import Navbar from '/src/components/Common/Navbar'
import { useWorkout } from '../contexts/workoutContexts/workoutContext'
import { useLocation, useNavigate } from 'react-router-dom'

const LibraryPage = () => {
  const { setAddedExerciseObjects, workoutStarted, setWorkoutStarted, selectedWorkout, setSelectedWorkout} = useWorkout()
  const navigate = useNavigate()
  const location = useLocation()

const handleShowCompletedWorkout = (workout) => {
  console.log("workout:", workout)
  
  setSelectedWorkout(workout)
  setAddedExerciseObjects(workout.exercises)
  navigate('/library_workout')
}

const handleStartWorkoutBtn = () => {
  setWorkoutStarted(true)
}

// Reset `selectedWorkout` when navigating back to `/` (otherwise screen is blank)
useEffect(() => {
  if (location.pathname === '/') {
    setSelectedWorkout(null);
  }
}, [location.pathname]);

return (
  <>
  {!selectedWorkout && !workoutStarted &&
    	<div className='flex flex-col items-center pb-3 w-[100dvw] h-[100dvh] sm:w-[80dvw] md:w-[70dvw] lg:max-w-4xl sm:h-[90dvh]  sm:rounded-3xl'>

        <div className="flex flex-col flex-grow w-full overflow-hidden">
          <LibrarySavedWorkouts handleShowCompletedWorkout={handleShowCompletedWorkout} selectedWorkout={selectedWorkout} handleStartWorkoutBtn={handleStartWorkoutBtn}/>
          </div>
    <Navbar /> 
    </div>}
  
  {!selectedWorkout && workoutStarted && <SelectWorkoutOption />}
  </>
)
  
}

export default LibraryPage
