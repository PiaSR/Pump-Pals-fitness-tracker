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
      
    async function getExerciseObjects() {
		try {
		  // Fetch exercise objects based on addedExerciseIds
		  const exerciseObjects = await Promise.all(
			addedExerciseIds.map((id) => fetchExerciseById(id))
		  );
	  
		  if (!exerciseObjects || exerciseObjects.length === 0) {
			console.error("Failed to fetch exercises.");
			return;
		  }
	  
		  // Fetch the user's last workout to get the max reps for each exercise
		  const workoutsCollection = collection(db, `users/${currentUser.uid}/workouts`);
		  const workoutSnapshot = await getDocs(workoutsCollection);
	  
		  let lastWorkout = null;
	  
		  // Find the most recent workout (order by `addedAt`)
		  workoutSnapshot.forEach((doc) => {
			const workout = doc.data();
			if (!lastWorkout || workout.addedAt.toMillis() > lastWorkout.addedAt.toMillis()) {
			  lastWorkout = workout;
			}
		  });
	  
		  // If there's a last workout, check for max reps for each exercise
		  const updatedExerciseObjects = exerciseObjects.map((exercise) => {
			const matchingExercise = lastWorkout?.exercises?.find(
			  (ex) => ex.id === exercise.id
			);
	  
			return {
			  ...exercise,
			  maxReps: matchingExercise ? matchingExercise.reps : null, // Set max reps if found
			  maxWeight: matchingExercise ? matchingExercise.weight : null, // Set max weight if found
			};
		  });
	  
		  setAddedExerciseObjects(updatedExerciseObjects);
		  console.log("Updated exercise objects with max reps:", updatedExerciseObjects);
	  
		  // Add workout to the database
		  addWorkoutToUserDb(updatedExerciseObjects);
		} catch (error) {
		  console.error("Error fetching exercise objects:", error);
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
				
				workoutTitle: 'New Workout',
				addedAt: new Date(),
				exercises: workoutObjects.map((exercise) => ({
					...exercise, 
					maxReps: exercise.maxReps || 0, // Add or overwrite the maxReps property
					maxWeight: exercise.maxWeight || 0, // Add or overwrite the maxWeight property
				  }))
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

