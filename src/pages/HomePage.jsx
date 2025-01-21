import React, {useState} from 'react'
import {LibraryHomepage} from '/src/components/Homepage/LibraryHomepage'
import { SelectWorkoutOption } from '../components/Homepage/SelectWorkoutOption'
import { useExercise } from '../contexts/workoutContexts/exerciseContext'
import Navbar from '/src/components/Common/Navbar'
import { useWorkout } from '../contexts/workoutContexts/workoutContext'
import ShowSavedWorkout from '../components/Homepage/ShowSavedWorkout'

const HomePage = () => {
  const {workoutStarted, setWorkoutStarted} = useExercise()
  const [selectedWorkout, setSelectedWorkout] =useState(null)
  const {workoutCollection, setAddedExerciseObjects, startNewWorkout} = useWorkout()


const handleShowCompletedWorkout = (workout) => {
  console.log("workout:", workout)
  
  setSelectedWorkout(workout)
  setAddedExerciseObjects(workout.exercises)
  setWorkoutStarted(true)
}

return (
  <>
  {!workoutStarted &&
    <div className='flex flex-col justify-between  w-[100dvw]  h-[100dvh] sm:w-[80dvw] md:w-[70dvw] lg:max-w-4xl sm:h-[90dvh] bg-bg-white bg-opacity-60 sm:rounded-3xl sm:m-3'>
    <LibraryHomepage handleShowCompletedWorkout={handleShowCompletedWorkout} selectedWorkout={selectedWorkout}/>
    <Navbar /> 
    </div>}
  {/* {workoutStarted && <SelectWorkoutOption setWorkoutStarted={setWorkoutStarted}/>} */}
{workoutStarted && <ShowSavedWorkout selectedWorkout={selectedWorkout} setWorkoutStarted={setWorkoutStarted}/>}
  
  </>
)
  
}

export default HomePage
