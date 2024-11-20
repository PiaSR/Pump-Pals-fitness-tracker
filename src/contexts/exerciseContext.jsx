
import React, { createContext, useState, useContext, useCallback } from 'react';
import { db } from "/src/firebase/firebase.js" 
import { doc, setDoc } from "firebase/firestore";

const ExerciseContext = createContext();

export function useExercise() {
  return useContext(ExerciseContext);
}

export function ExerciseProvider({ children }) {
  const [exercises, setExercises] = useState([]);
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
     
      const formattedExercises = data.excercises_ids.map((exercise) => ({
        originalName: exercise.replaceAll("_", " "), // "Push-Up"; replace all underscores from data results
        normalizedName: exercise.replaceAll(/[-_]/g, "").toLowerCase().trim() // "pushup"; to include spelling variations when used in search results
      }));
      setExercises(formattedExercises)

    } catch (error) {
      console.log('error fetching exercises:', error);
      setError(error.message);
    } finally {
      setLoading(false)
    }
  }, [])

//setting different endpoints depending on filter
const fetchExercisesByEquipment = (equipment) => {
  fetchExercises(`/exercises/equipment/${equipment}`)
}

const fetchExercisesByMuscle = (muscle) => {
  fetchExercises(`/exercises/muscle/${muscle}`)
}

const fetchAllExercises = () => {
  fetchExercises('/exercises')
}

const value = {
  exercises,
  loading,
  error,
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
