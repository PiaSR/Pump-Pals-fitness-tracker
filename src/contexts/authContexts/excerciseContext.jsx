import React, { useContext, useState, useEffect } from 'react'
import { db } from "/src/firebase/firebase.js" 
import { doc, setDoc } from "firebase/firestore";

const workoutsContext = () => {
	useEffect(() => {
		const fetchExercises = async () => {
		  try {
			const response = await fetch('https://example.com/api/exercises');
			const data = await response.json();
			setExercises(data);
		  } catch (error) {
			console.error("Error fetching exercises:", error);
		  }
		};
		fetchExercises();
	  }, []);
  return (
	<AuthContext.Provider value={value}>
			
	</AuthContext.Provider>
  )
}

export default workoutsContext

// ExerciseContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const ExerciseContext = createContext();

export function useExercise() {
  return useContext(ExerciseContext);
}

export function ExerciseProvider({ children }) {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExercises = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://exercise-db-fitness-workout-gym.p.rapidapi.com/exercises', {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': 'YOUR_API_KEY',
            'X-RapidAPI-Host': 'exercise-db-fitness-workout-gym.p.rapidapi.com'
          }
        });
        const data = await response.json();
        setExercises(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, []);

  return (
    <ExerciseContext.Provider value={{ exercises, loading, error }}>
      {children}
    </ExerciseContext.Provider>
  );
}
