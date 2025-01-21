import React, {useState} from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import { useExercise } from '../../contexts/workoutContexts/exerciseContext';
import { useWorkout } from '../../contexts/workoutContexts/workoutContext'
import { TiTick } from "react-icons/ti";
import  ExerciseSetsEachExercise from '/src/components/Workouts/ExerciseSetsEachExercise'





const ExerciseSetsContainer = () => {
	const {loading} = useExercise()
	const {addedExerciseObjects} = useWorkout()
	

  return (
	<div >
		{loading && <p>Loading...</p>}
	{!loading && Array.isArray(addedExerciseObjects) &&  addedExerciseObjects.map((exercise, index) => (
		<ExerciseSetsEachExercise exercise={exercise} index={index} />
	))}
	</div>
  )
  
}

export default ExerciseSetsContainer