import React from 'react'
import { useWorkout } from '../../contexts/workoutContexts/workoutContext'
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import ExerciseSetsContainer from '/src/components/Workouts/ExerciseSetsContainer.jsx'



const NewWorkout = () => {
	
	const {workoutStarted,
		setWorkoutStarted,
		addedExerciseIds,
		setAddedExerciseIds,
		addedExerciseObjects,
		setAddedExerciseObjects,
		handleAddExercise,
		
		handleRemoveExercise,
		startNewWorkout} = useWorkout()

  return (
	<div className='flex justify-center items-center py-6 w-[100dvw]  h-[100dvh] sm:w-[80dvw] md:w-[70dvw] lg:max-w-4xl sm:h-[90dvh] bg-bg-white bg-opacity-60 sm:rounded-3xl '>
		
		<div className='flex flex-col w-10/12 md:w-9/12 h-full sm:h-[90%] p-4  '>
		{/* header */}
			<div className='flex flex-col mb-10 '>
			<MdOutlineKeyboardArrowDown onClick={()=> startNewWorkout()} className='text-3xl text-gray-800'/>

			<h3 className=' text-2xl justify-self-center mt-6 text-gray-800'>New Workout</h3>
			</div>


			{/* exercise container */}
			<ExerciseSetsContainer addedExerciseObjects={addedExerciseObjects} />

		</div>
	</div>
  )
}

export default NewWorkout