import React, {createContext,useContext, useState, useCallback, useEffect} from 'react'
import { db } from "/src/firebase/firebase.js" 
import { doc, setDoc, deleteDoc, updateDoc, collection,  getDocs } from "firebase/firestore";
import { useExercise } from './exerciseContext';
import { useAuth } from '../authContexts/authContext';



const WorkoutContext = createContext();

export function useWorkout() {
	return useContext(WorkoutContext);
  }


export function WorkoutProvider({ children }) {
	const { fetchExerciseById } = useExercise(); 
	const {currentUser} = useAuth()
	const [workoutStarted, setWorkoutStarted] = useState(false)
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
		addWorkoutToUserDb(exerciseObjects)
      
      } catch (error) {
        console.log("error fetchin exercise objects:", error)
      } 
    
    }
  
    const handleRemoveExercise = (exerciseId) => {
      addedExerciseIds((prev)=> prev.filter((exId)=> exId !== exerciseId))
      console.log("removed exercises:", addedExerciseIds)
    }

	async function addWorkoutToUserDb (workoutObjects) {
    
		try {
			
			const userRef = doc(collection(db, `users/${currentUser.uid}/workouts`) );
			await setDoc(userRef, {
				...workoutObjects,
				workoutTitle: 'New Workout',
				addedAt: new Date(),
			  });
			  console.log('workout added to db:', workoutObjects, currentUser.uid)
		} catch (error){
			console.log("error adding workout to db:", error)
		}

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
		startNewWorkout,
		addWorkoutToUserDb

	}

	return (
		<WorkoutContext.Provider value={value}>
		  {children}
		</WorkoutContext.Provider>
	  );
}

