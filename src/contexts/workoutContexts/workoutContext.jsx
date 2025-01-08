import React, {createContext,useContext, useState, useCallback, useEffect} from 'react'
import { useExercise } from './exerciseContext';


const WorkoutContext = createContext();

export function useWorkout() {
	return useContext(WorkoutContext);
  }


export function WorkoutProvider({ children }) {
	const { fetchExerciseById } = useExercise(); 
	const  [workoutStarted, setWorkoutStarted] = useState(false)
   const [addedExerciseIds, setAddedExerciseIds] =useState([]) // For storing Ids
   const [addedExerciseObjects, setAddedExerciseObjects] = useState([]); // For storing full objects


    const startNewWorkout = useCallback(() => {
      if (addedExerciseIds.length === 0) {
        console.log("No exercises to start a workout.");
        return;
      }
        setWorkoutStarted(!workoutStarted)
        getExerciseObjects()
        
    })

    useEffect(() => {
      console.log("addedExerciseToWorkout objects",addedExerciseObjects)
    }, [startNewWorkout])

    function handleAddExercise (id)  {
      setAddedExerciseIds((prevId) =>  {
        if (!prevId.includes(id)) {
        return [...prevId, id];
      }
        console.log("added exercises (just id):", addedExerciseIds)
    })}
      
    async function getExerciseObjects (){
      try {
        const exerciseObjects = await Promise.all(
          addedExerciseIds.map((id)=>fetchExerciseById(id))
        )
        if (!exerciseObjects || exerciseObjects.lenght === 0) {
          console.error("Failed to fetch exercises.");
          return;
        }
        setAddedExerciseObjects(exerciseObjects);
      
      } catch (error) {
        console.log("error fetchin exercise objects:", error)
      } 
    
    }
  
    const handleRemoveExercise = (exerciseId) => {
      addedExerciseIds((prev)=> prev.filter((exId)=> exId !== exerciseId))
      console.log("removed exercises:", addedExerciseIds)
    }

	const value = {
		workoutStarted,
		setWorkoutStarted,
		addedExerciseIds,
		setAddedExerciseIds,
		addedExerciseObjects,
		setAddedExerciseObjects,
		handleAddExercise,
		getExerciseObjects,
		handleRemoveExercise,
		startNewWorkout



	}
	return (
		<WorkoutContext.Provider value={value}>
		  {children}
		</WorkoutContext.Provider>
	  );
}

