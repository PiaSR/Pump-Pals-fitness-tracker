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
	const [workoutCollection, setWorkoutCollection] = useState([])
	const [selectedWorkout, setSelectedWorkout] =useState(null)

    const startNewWorkout = useCallback(() => {
      if (addedExerciseIds.length === 0) {
        console.log("No exercises to start a workout.");
        return;
      }
        setWorkoutStarted(!workoutStarted)
        getExerciseObjects()
        
    })

	

	const startWorkoutFromSavedLibrary = useCallback((workout) => {
		setWorkoutStarted(!workoutStarted)
		setAddedExerciseObjects(workout)
		
	})

	//get the workout collection when user is logged in, to display in library
	useEffect(() => {
		if (currentUser) {
		  getWorkoutsFromDb();
		}
	  }, [currentUser]);

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
			  maxReps: matchingExercise ? matchingExercise.maxReps : null, // Set max reps if found
			  maxWeight: matchingExercise ? matchingExercise.maxWeight : null, // Set max weight if found
			};
		  });
	  
		  setAddedExerciseObjects(updatedExerciseObjects || []);
	  
		  
		} catch (error) {
		  console.error("Error fetching exercise objects:", error);
		}
	  }
  
    const handleRemoveExercise = (exerciseId) => {
      addedExerciseIds((prev)=> prev.filter((exId)=> exId !== exerciseId))
      console.log("removed exercises:", addedExerciseIds)
    }


	// Add workout to the database (only once "end workout" button is clicked)
	async function addWorkoutToUserDb (workoutObjects) {
    
		try {
			
			const docRef = doc(collection(db, `users/${currentUser.uid}/workouts`) );
			await setDoc(docRef, {
				
				workoutTitle: 'Workout',
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

	async function getWorkoutsFromDb() {
		try {
		  if (!currentUser || !db) return;
	  
		  const workoutsRef = collection(db, `users/${currentUser.uid}/workouts`);
		  const querySnapshot = await getDocs(workoutsRef);
	  
		  const workouts = querySnapshot.docs.map((doc) => {
			const data = doc.data();
	  
			// Convert Firestore Timestamp to JavaScript Date
			if (data.addedAt) {
			  data.addedAt = data.addedAt.toDate(); // Convert Timestamp to Date
			  data.addedAtFormatted = data.addedAt.toLocaleString(undefined, {
				day: "2-digit",
				month: "short",
				hour: '2-digit',
				minute: "2-digit",
				hour12: false,
			  }); 
			}
	  
			return {
			  id: doc.id,
			  ...data,
			};
		  });
	  
		  setWorkoutCollection(workouts);
		  console.log("Fetched workouts:", workouts);
		} catch (error) {
		  console.error("Error fetching workouts from Firestore:", error);
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
		startWorkoutFromSavedLibrary,
		addWorkoutToUserDb,
		workoutCollection,
		getWorkoutsFromDb,
		selectedWorkout,
		setSelectedWorkout
	}

	return (
		<WorkoutContext.Provider value={value}>
		  {children}
		</WorkoutContext.Provider>
	  );
}

