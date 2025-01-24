import React from 'react'
import { useWorkout } from '../../contexts/workoutContexts/workoutContext'
import ExerciseSetsContainer from '../Workouts/ExerciseSetsContainer'
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import StartNewWorkoutBtn from '../Buttons/StartNewWorkoutBtn'
import { useNavigate } from 'react-router-dom';

const ShowSavedWorkout = () => {

	const { setAddedExerciseIds, startWorkoutFromSavedLibrary, selectedWorkout, setSelectedWorkout} = useWorkout()
	const navigate = useNavigate()
	

	//need to set exercise ids first so that exercises already in saved workout show as 'selected' in workout search list
	const handleAddExercisesClick = () => {
		if (selectedWorkout && selectedWorkout.exercises) {
		  const exerciseIds = selectedWorkout.exercises.map((exercise) => exercise.id); // Extract exercise IDs
		  setAddedExerciseIds(exerciseIds); // Set the state with the IDs
		}
		navigate('/workout')
	  };


	//using different function (not startNewWorkout) so we're not fetching exercises from API unnecessarily
	const handleStartSavedWorkout = (workout) => {
		startWorkoutFromSavedLibrary(workout.exercises)
		navigate('/workout')
	}
	

  return (
	<div className='flex justify-center items-center flex-col py-6 w-[100dvw]  h-[100dvh] sm:w-[80dvw] md:w-[70dvw] lg:max-w-4xl sm:h-[90dvh] bg-bg-white bg-opacity-60 sm:rounded-3xl  '>

		<div className='flex flex-col w-10/12 md:w-9/12 h-full sm:h-[90%] p-4  '>
		{/* header */}
		  <div className='flex flex-col mb-10 '>
		  <MdOutlineKeyboardArrowDown onClick={()=> navigate('/')} className='text-3xl text-gray-800'/>

		  <h3 className=' text-2xl justify-self-center mt-6 text-gray-800'>{`${selectedWorkout.workoutTitle}, ${selectedWorkout.addedAtFormatted}`}</h3>
		  </div>


		  {/* exercise container */}
		  <ExerciseSetsContainer  />


		  <button className='btn-secondary bg-opacity-40 w-[85%] text-sm justify-self-end mt-8' 
			onClick={()=>handleAddExercisesClick()}
			>Add Exercises
			</button>
		  
			<button className='btn-secondary w-[85%] text-sm justify-self-end mt-8' 
			onClick={()=>handleStartSavedWorkout(selectedWorkout)}
			>Start Workout
			</button>
		  
		</div>
	 
	 
</div>
  )
}

export default ShowSavedWorkout