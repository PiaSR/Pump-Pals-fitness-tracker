import React, {useState} from 'react'
import { useExercise } from '../../contexts/exerciseContext';


const FavoriteWorkouts = () => {

  const { favorites} = useExercise()

  
  return (
	<div>
    <h3>Favorite Workouts</h3>
    {console.log("in favorite workouts:", favorites)}
    {favorites && favorites.length > 0 
   ? (
    <ul>
      {console.log("favorites array:", favorites)}
      {favorites.map((exercise, index) => (
        <li key={index}>{exercise.name}</li>
        
      )
      )}
    </ul>
  )  
   : (
    <p>No exercises found </p>
  )}

    </div>
  
)}

export default FavoriteWorkouts