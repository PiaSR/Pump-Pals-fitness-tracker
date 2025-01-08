import React, {useState, useCallback, useEffect} from 'react'
import NewWorkout from '../components/Workouts/NewWorkout';

import WorkoutSearch from '../components/Workouts/WorkoutSearch';
import { useWorkout } from '../contexts/workoutContexts/workoutContext';





const WorkoutPage = ( ) => {
const {workoutStarted} = useWorkout()

   

  return(
    <>
     {!workoutStarted && <WorkoutSearch 
       
        />}
     {workoutStarted && <NewWorkout 
         
        />}
      
  </>
  )
}

export default WorkoutPage