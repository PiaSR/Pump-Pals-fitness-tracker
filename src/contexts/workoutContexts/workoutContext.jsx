import React, {createContext,useContext, useState, useCallback, useEffect} from 'react'
import { db } from "/src/firebase/firebase.js" 
import { doc, setDoc, deleteDoc, updateDoc, collection,  getDocs } from "firebase/firestore";
import { useExercise } from './exerciseContext';
import { useAuth } from '../authContexts/authContext';
import { useNavigate } from 'react-router-dom';



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
	const [sets, setSets] = useState({});
	const [templates, setTemplates] = useState([])
	


    const startNewWorkout = useCallback(() => {
		try {
			const isWorkoutStarted = workoutStarted;
		console.log("Toggling workout started:", isWorkoutStarted);
  
		setWorkoutStarted(!isWorkoutStarted);
	  
		if (!isWorkoutStarted) {
		  console.log("Fetching exercise objects");
     
	 // Only fetch exercises that haven't been added yet
	 const newExerciseIds = addedExerciseIds.filter(
		(id) => !addedExerciseObjects.some((ex) => ex.id === id)
	);

	if (newExerciseIds.length === 0) {
		console.log("No new exercises to fetch.");
		return;
	}
	getExerciseObjects(newExerciseIds);
	} 
	}
	catch(error) {
		console.error("Error starting new workout:", error);
        
    }},[addedExerciseIds, workoutStarted, getExerciseObjects]);

	

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

	


    async function getExerciseObjects(exerciseIds) {
		try {
			if (exerciseIds.length === 0) {
				console.log("No exercises to fetch.");
				return;
			}
	
			const exerciseObjects = await Promise.all(
				exerciseIds.map((id) => fetchExerciseById(id))
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
		  
		// Merge old exercises with new ones
		  setAddedExerciseObjects((prevExercises) => {
            const existingExercisesMap = new Map(prevExercises.map(ex => [ex.id, ex]));
            
            // Add new exercises (overwrite if they already exist)
            updatedExerciseObjects.forEach(ex => existingExercisesMap.set(ex.id, ex));

            return Array.from(existingExercisesMap.values()); // Convert Map back to array
        });

        // Keep existing sets and add new ones
        setSets((prevSets) => {
            const newSets = { ...prevSets };

            updatedExerciseObjects.forEach((exercise) => {
                if (!newSets[exercise.id]) {
                    newSets[exercise.id] = [{
                        reps: exercise.maxReps > 0 ? exercise.maxReps : "",
                        weight: exercise.maxWeight > 0 ? exercise.maxWeight : "",
                        finishSet: false
                    }];
                }
            });

            return newSets;
        });
		
		  
		} catch (error) {
		  console.error("Error fetching exercise objects:", error);
		}
	  }


	const handleAddExercise =  async (id) => {
		console.log("handleAddExercise called with id:", id);

		const exercise = await fetchExerciseById(id);

		if (sets[id]) {
			console.log("Exercise already added:", sets[id]);
			return;
		  }

		  console.log("Adding new exercise:", id);
		setAddedExerciseIds((prev) => [...prev, id]);
	
		// Ensure the exercise has a default set structure
		setSets((prev) => ({
		  ...prev,
		  [id]: prev[id] || [{ 
			reps: exercise.maxReps>0 ? exercise.maxReps : "", 
			weight: exercise.maxWeight>0 ? exercise.maxWeight : "", 
			finishSet: false }],
		}));
		console.log("sets after handleAddExercise", sets);

	  };
      
	
	
  
    const handleRemoveExercise = (exerciseId) => {
      setAddedExerciseIds((prev)=> prev.filter((exId)=> exId !== exerciseId))
      console.log("removed exercises:", addedExerciseIds)

	  setSets((prev) => {
		const { [exerciseId]: _, ...rest } = prev; // Remove the specific exercise's sets
		return rest;
	  });
    }

	const updateExerciseSets = (id, updatedSets) => {
		setSets((prev) => {
			const newSets = { ...prev, [id]: updatedSets };
		
			return newSets;
		});
	};
	


	// Add workout to the database (only once "end workout" button is clicked)
	async function addWorkoutToUserDb (workoutObjects) {
    
		try {
			
			const docRef = doc(collection(db, `users/${currentUser.uid}/workouts`) );
			await setDoc(docRef, {
				
				workoutTitle: 'Workout',
				addedAt: new Date(),
				isTemplate: false,
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

	  useEffect(() => {
		console.log("Templates updated:", templates);
	}, [templates]);
	

	  //change isTemplates in workouts to TRUE, add to templates array
	  
	  async function addToTemplates(selectedWorkout) {
		if (!selectedWorkout || !currentUser) {
		  console.error("Workout or current user not found.");
		  return;
		}
  
		try {
			console.log("Before updating templates:", templates);

			setTemplates(prevTemplates => {
				const isTemplate = prevTemplates.some(template => template.id === selectedWorkout.id);
	
				console.log("Is already a template?", isTemplate);

				const workoutRef = doc(db, `users/${currentUser.uid}/workouts/${selectedWorkout.id}`);
	
				if (isTemplate) {
					// Remove from templates
					updateDoc(workoutRef, { isTemplate: false });
					console.log("Removed from templates:", selectedWorkout.id);
					return prevTemplates.filter(template => template.id !== selectedWorkout.id);
				} else {
					// Add to templates
					updateDoc(workoutRef, { isTemplate: true });
					console.log("Added to templates:", selectedWorkout.id, 'template:', templates);
					console.log("After updating templates:", templates); 

					return [...prevTemplates, { ...selectedWorkout, isTemplate: true }];
				}
			}
			);
		} catch (error) {
			console.error("Error updating template status:", error);
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
		setSelectedWorkout,
		sets,
		setSets,
		updateExerciseSets,
		addToTemplates,
		templates,
		setTemplates
	}

	return (
		<WorkoutContext.Provider value={value}>
		  {children}
		</WorkoutContext.Provider>
	  );
}

