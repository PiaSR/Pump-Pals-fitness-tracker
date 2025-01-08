import React from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import { useWorkout } from '../../contexts/workoutContexts/workoutContext'



const ExerciseSetsContainer = () => {

	const {addedExerciseObjects} = useWorkout()
	
  return (
	<div>
	{addedExerciseObjects.map((exercise) => (
		<div 
			className='flex flex-col border border-solid border-gray-400 rounded-md p-5'
			key={exercise.id}>
		<div className='flex justify-between'>
			<div className='flex flex-col'>
				<h5 className='text-md text-gray-600 font-semibold'>{exercise.name}</h5>
				<p className='text-sm text-gray-500'>{exercise.equipment}</p>
			</div>
			<BsThreeDotsVertical className='text-gray-600'/>
			
		</div>
	</div>
	))}
	</div>
  )
  
}

export default ExerciseSetsContainer