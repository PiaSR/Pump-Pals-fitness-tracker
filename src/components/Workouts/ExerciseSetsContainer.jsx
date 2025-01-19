import React from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import { useExercise } from '../../contexts/workoutContexts/exerciseContext';
import { useWorkout } from '../../contexts/workoutContexts/workoutContext'



const ExerciseSetsContainer = () => {
	const {loading} = useExercise()
	const {addedExerciseObjects} = useWorkout()

  return (
	<div >
		{loading && <p>Loading...</p>}
	{!loading && addedExerciseObjects.map((exercise) => (
		<div 
			className='flex flex-col border border-solid border-gray-400 rounded-md p-5 my-6'
			key={exercise.id}>
		<div className='flex justify-between'>
			<div className='flex flex-col'>
				<h5 className='text-md text-gray-600 font-semibold'>{exercise.name}</h5>
				<p className='text-sm text-gray-500'>{exercise.equipment.charAt(0).toUpperCase() + exercise.equipment.slice(1)}</p>
			</div>
			<BsThreeDotsVertical className='text-gray-600'/>
			
		</div>
		<div>
			<div className='w-8 h-8 flex justify-center items-center text-gray-500 rounded-full border-solid border border-gray-500 p-2'>{}</div>
		</div>
	</div>
	))}
	</div>
  )
  
}

export default ExerciseSetsContainer