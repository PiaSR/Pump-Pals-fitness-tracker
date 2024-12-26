import React, {useState} from 'react'
import {StartingScreenHomepage} from '/src/components/Homepage/StartingScreenHomepage'
import { SelectWorkoutOption } from '../components/Homepage/SelectWorkoutOption'

const HomePage = () => {
  const [workoutStarted, setWorkoutStarted] = useState(false)

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
