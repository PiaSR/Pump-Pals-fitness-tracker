import React, {useState, useCallback} from 'react'
import NewWorkout from '../components/Workouts/NewWorkout';

import WorkoutSearch from '../components/Workouts/WorkoutSearch';
import { useExercise } from '../contexts/exerciseContext';





const WorkoutPage = ( ) => {

  const {fetchExerciseById} = useExercise()

   const  [workoutStarted, setWorkoutStarted] = useState(false)
   const [addedExerciseToWorkout, setAddedExerciseToWorkout] =useState([])

    const startNewWorkout = useCallback(() => {
        setWorkoutStarted(!workoutStarted)
    })

   async function handleAddExercise (id)  {
    try {
      const exercise = await fetchExerciseById(id)
      if (!exercise) {
        console.error("Failed to fetch exercise or exercise does not exist.");
        return;
      }
      setAddedExerciseToWorkout((prev => [...prev, exercise]));
      console.log("added exercises:", addedExerciseToWorkout)
    } catch (error) {
      console.log("error adding exercise:", error)
    } 
    }
      
    
  
    const handleRemoveExercise = (exerciseId) => {
      setAddedExerciseToWorkout((prev)=> prev.filter((ex)=> ex.id !== exerciseId))
      console.log("removed exercises:", addedExerciseToWorkout)
    }

  return(
    <>
     {!workoutStarted && <WorkoutSearch 
        addedExerciseToWorkout={addedExerciseToWorkout} 
        setAddedExerciseToWorkout={setAddedExerciseToWorkout} 
        startNewWorkout={startNewWorkout}
        handleAddExercise={handleAddExercise}
        handleRemoveExercise={handleRemoveExercise}
        />}
     {workoutStarted && <NewWorkout 
        startNewWorkout={startNewWorkout}
        addedExerciseToWorkout={addedExerciseToWorkout} 
        setAddedExerciseToWorkout={setAddedExerciseToWorkout} 
        />}
      
  </>
  )
}

export default WorkoutPage