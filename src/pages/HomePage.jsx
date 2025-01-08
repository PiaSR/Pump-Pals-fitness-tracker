import React, {useState} from 'react'
import {StartingScreenHomepage} from '/src/components/Homepage/StartingScreenHomepage'
import { SelectWorkoutOption } from '../components/Homepage/SelectWorkoutOption'
import { useExercise } from '../contexts/workoutContexts/exerciseContext'

const HomePage = () => {
  const {workoutStarted, setWorkoutStarted} = useExercise()

  const handleClick = () => {
    setWorkoutStarted(true)
  }
return (
  <>
  {!workoutStarted && <StartingScreenHomepage onClick={handleClick}  />}
  {workoutStarted && <SelectWorkoutOption setWorkoutStarted={setWorkoutStarted}/>}
  </>
)
  
}

export default HomePage
