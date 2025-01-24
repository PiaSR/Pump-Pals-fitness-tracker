import React, {useState} from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import { useExercise } from '../../contexts/workoutContexts/exerciseContext';
import { useWorkout } from '../../contexts/workoutContexts/workoutContext'
import { TiTick } from "react-icons/ti";
import  ExerciseSetsEachExercise from '/src/components/Workouts/ExerciseSetsEachExercise'





const ExerciseSetsContainer = () => {
	const {loading} = useExercise()
	const {addedExerciseObjects, startNewWorkout, workoutStarted} = useWorkout()
	


  return (
	<div className=' flex flex-col w-full h-[70%] overflow-y-auto overflow-x-hidden ' >
		{loading && <p>Loading...</p>}
	{!loading && Array.isArray(addedExerciseObjects) &&  addedExerciseObjects.map((exercise, index) => (
		
		<ExerciseSetsEachExercise exercise={exercise} index={index} key={exercise.id}/>
		
	))}
	{!loading && <button className="btn-secondary w-full text-sm justify-self-end mt-8 "
		onClick={()=> startNewWorkout()}
		>Add Exercises
		</button>}
	</div>
  )
  
}

export default ExerciseSetsContainer