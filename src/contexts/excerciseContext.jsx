
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { db } from "/src/firebase/firebase.js" 
import { doc, setDoc } from "firebase/firestore";

const ExerciseContext = createContext();

export function useExercise() {
  return useContext(ExerciseContext);
}

export function ExerciseProvider({ children }) {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);

  const BASE_URL = "https://exercise-db-fitness-workout-gym.p.rapidapi.com";
  const HEADERS = {
  "X-RapidAPI-Key": "c3902f426bmsha9b827a6c78df6ap14171ejsn86d243dde4cd",
  "X-RapidAPI-Host": "exercise-db-fitness-workout-gym.p.rapidapi.com"
};

  //memoizing fetch function
  const fetchExercises = useCallback(async (endpoint) => {
    setLoading(true)
    try {
      const response = await fetch(`${BASE_URL}/${endpoint}`, {HEADERS});
      if (!response) throw new Error("Network response was not ok");
      const data = await response.json()
      setExercises()
    } catch (error) {
      console.log('error fetching exercises:', error)
    } finally {
      setLoading(false)
    }
  }, [])

//setting different enpoints depending on filter
const fetchExercisesByEquipment = (equipment) => {
  fetchExercises(`/exercises/equipment/${equipment}`)
}

const fetchExercisesByMuscle = (muscle) => {
  fetchExercises(`/exercises/muscle/${muscle}`)
}

const fetchAllExercises = () => {
  fetchExercises('exercises')
}

const value = {
  exercises,
  loading,
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
