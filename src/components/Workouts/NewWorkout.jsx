import React from 'react'
import { useWorkout } from '../../contexts/workoutContexts/workoutContext'
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import ExerciseSetsContainer from '/src/components/Workouts/ExerciseSetsContainer.jsx'
import { useNavigate } from 'react-router-dom';
import { useExercise } from '../../contexts/workoutContexts/exerciseContext';



const NewWorkout = () => {
	const { setWorkoutStarted} = useExercise()
	const {
		addedExerciseObjects,
		startNewWorkout,
		setAddedExerciseIds,
		addWorkoutToUserDb,
		workoutStarted,
		setAddedExerciseObjects
		} = useWorkout()
	const navigate = useNavigate()

	const handleEndWorkoutBtn =() => {
		addWorkoutToUserDb(addedExerciseObjects)
		setAddedExerciseIds([])
		setAddedExerciseObjects([])
		setWorkoutStarted(false)
		navigate('/')
	}

	//add updated maxRep maxWeight to db when ending workout

  return (
	<div className='flex justify-center items-center py-2 w-[100dvw]  h-[100dvh] sm:w-[80dvw] md:w-[70dvw] lg:max-w-4xl sm:h-[90dvh] bg-bg-white bg-opacity-60 sm:rounded-3xl '>
		
		<div className='flex flex-col justify-between w-10/12 md:w-9/12 sm:h-[90%] p-2 h-full '>
		{/* header */}
			<div className='flex flex-col mb-10 '>
			<MdOutlineKeyboardArrowDown onClick={()=> startNewWorkout()} className='text-3xl text-gray-800'/>

			<h3 className=' text-2xl justify-self-center mt-6 text-gray-800'>New Workout</h3>
			</div>


			{/* exercise container */}
			<ExerciseSetsContainer  />


		
			<button className='btn-secondary w-full text-sm justify-self-end mt-1 bg-red-400' 
				onClick={handleEndWorkoutBtn}
				>End Workout
				</button>
		</div>
	</div>
  )
}

export default NewWorkout