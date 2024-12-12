
import React, { createContext, useState, useContext, useCallback } from 'react';
import { db } from "/src/firebase/firebase.js" 
import { doc, setDoc } from "firebase/firestore";

const ExerciseContext = createContext();

export function useExercise() {
  return useContext(ExerciseContext);
}

export function ExerciseProvider({ children }) {
  const [exercises, setExercises] = useState([]);
  const [allExercises, setAllExercises] = useState([]); //to cache full exercise list
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const BASE_URL = "https://exercise-db-fitness-workout-gym.p.rapidapi.com";
  const HEADERS = {
  "X-RapidAPI-Key": "c3902f426bmsha9b827a6c78df6ap14171ejsn86d243dde4cd",
  "X-RapidAPI-Host": "exercise-db-fitness-workout-gym.p.rapidapi.com"
};

  //memoizing fetch function
  const fetchExercises = useCallback(async (endpoint) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {headers: HEADERS});
      if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);
      const data = await response.json()
     
     return data; //raw data to be used in further calls

    } catch (error) {
      console.log('error fetching exercises:', error);
      setError(error.message);
    } finally {
      setLoading(false)
    }
  }, [])


  //IF NO FILTER IS APPLIED, WE NEED FULL LIST OF EXERCISES (ONLY IDs, NOT FULL OBJECTS AVAILABLE)
  const fetchAllExercises = useCallback(async () => {
    if (allExercises.length > 0) {
      setExercises(allExercises);
      return;
    }

        const data = await fetchExercises('/exercises');
        if (data && data.excercises_ids) {
          const formattedExercises = data.excercises_ids.map((id) => ({
            id,
            name: id.replaceAll("_", " "), // "Push-Up"
            normalizedName: id.replaceAll(/[-_]/g, "").toLowerCase().trim(), // "pushup" 
          }));
          setAllExercises(formattedExercises); // Cache full list
          setExercises(formattedExercises); 
        }
  }, [fetchExercises, allExercises]);


  //fetch exercise object if no filter applied

  const fetchExerciseById = useCallback(async (id) => {

    const data =await fetchExercises(`/exercise/${id}`)
    console.log("Fetched exercise data:", data);
    if (data) {
      const exercise = ({
        id: data.id,
        name: data.name,
        normalizedName: data.name.replaceAll(/[-_]/g, "").toLowerCase().trim(),
        category: data.category,
        equipment: data.equipment,
        level: data.level,
        primaryMuscles: data.primaryMuscles || [],
        secondaryMuscles: data.secondaryMuscles || [],
        maxReps: 0,
        maxWeight: 0
      });
   
      return exercise
    }  else {
      return null
    }
    
  }, [fetchExercises, setExercises])

  // Fetch exercises filtered by muscle
  const fetchExercisesByMuscle = useCallback(async (muscle) => {
   
        const data = await fetchExercises(`/exercises/muscle/${muscle}`);
        
        if (data) {
          const formattedExercises = data.map((exercise) => ({
            id: exercise.id,
            name: exercise.name,
            normalizedName: exercise.name.replaceAll(/[-_]/g, "").toLowerCase().trim(),
            category: exercise.category,
            equipment: exercise.equipment,
            level: exercise.level,
            primaryMuscles: exercise.primaryMuscles || [],
            secondaryMuscles: exercise.secondaryMuscles || [],
            maxReps: 0,
            maxWeight: 0
          }));
       
          setExercises(formattedExercises); // Set filtered exercises
        } 
  }, [fetchExercises]);

  // Fetch exercises filtered by equipment
  const fetchExercisesByEquipment = useCallback(async (equipment) => {
        const data = await fetchExercises(`/exercises/equipment/${equipment}`);
        if (data) {
          const formattedExercises = data.map((exercise) => ({
            id: exercise.id,
            name: exercise.name,
            normalizedName: exercise.name.replaceAll(/[-_]/g, "").toLowerCase().trim(),
            category: exercise.category,
            equipment: exercise.equipment,
            level: exercise.level,
            primaryMuscles: exercise.primaryMuscles || [],
            secondaryMuscles: exercise.secondaryMuscles || [],
            maxReps: 0,
            maxWeight: 0
          }));
          setExercises(formattedExercises); // Set filtered exercises
        }
  }, [fetchExercises]);


const value = {
  exercises,
  allExercises,
  loading,
  error,
  fetchExerciseById,
  fetchExercisesByEquipment,
  fetchExercisesByMuscle,
  fetchAllExercises
}

  return (
    <ExerciseContext.Provider value={value}>
      {children}
    </ExerciseContext.Provider>
  );
}
