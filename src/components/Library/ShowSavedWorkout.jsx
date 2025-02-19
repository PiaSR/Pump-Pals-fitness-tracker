import React from 'react'
import { useWorkout } from '../../contexts/workoutContexts/workoutContext'
import ExerciseSetsContainer from '../Workouts/ExerciseSetsContainer'
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import StartNewWorkoutBtn from '../Buttons/StartNewWorkoutBtn'
import { useNavigate } from 'react-router-dom';
import { useExercise } from '../../contexts/workoutContexts/exerciseContext';
import BtnSetFavorite from '../Buttons/BtnSetFavorite';
import BtnSetTemplate from '../Buttons/BtnSetTemplate';


const ShowSavedWorkout = () => {

	const { setWorkoutStarted, startWorkoutFromSavedLibrary, selectedWorkout, setSelectedWorkout, addToTemplates} = useWorkout()
	const {addToFavorites,favorites} = useExercise()

	const navigate = useNavigate()
	

	//need to set exercise ids first so that exercises already in saved workout show as 'selected' in workout search list
	// const handleAddExercisesClick = () => {
	// 	if (selectedWorkout && selectedWorkout.exercises) {
	// 	  const exerciseIds = selectedWorkout.exercises.map((exercise) => exercise.id); // Extract exercise IDs
	// 	  setAddedExerciseIds(exerciseIds); // Set the state with the IDs
	// 	}
	// 	navigate('/workout')
	//   };


	//using different function (not startNewWorkout) so we're not fetching exercises from API unnecessarily
	const handleStartSavedWorkout = (workout) => {
		startWorkoutFromSavedLibrary(workout.exercises)
		navigate('/workout')
	}

	const returnToLibrary = () => {
		setWorkoutStarted(false)
		setSelectedWorkout(!selectedWorkout)
		navigate('/library')
	}
	

  return (
	<div className='flex justify-center items-center flex-col py-7 w-[100dvw]  h-[100dvh] sm:w-[80dvw] md:w-[70dvw] lg:max-w-4xl sm:h-[90dvh]  sm:rounded-3xl  '>

		<div className='flex flex-col w-10/12 md:w-9/12 h-full sm:h-[90%] p-4  '>
		{/* header */}
		  <div className='flex justify-between mb-10 '>
		  <div className=' flex flex-col'>
		  <MdOutlineKeyboardArrowDown onClick={()=> returnToLibrary()} className='text-4xl text-gray-800'/>

		  <h3 className=' text-2xl justify-self-center mt-6 text-gray-800'>{`${selectedWorkout.workoutTitle}, ${selectedWorkout.addedAtFormatted}`}</h3>
		  </div>
		  <BtnSetTemplate onClick={()=> addToTemplates(selectedWorkout)} className=''/>
		  
		  </div>


		  {/* exercise container */}
		  <ExerciseSetsContainer  />

		  
			<button className='btn-secondary w-full  justify-self-end mt-8' 
			onClick={()=>handleStartSavedWorkout(selectedWorkout)}
			>Start Workout
			</button>
		  
		</div>
	 
	 
</div>
  )
}

export default ShowSavedWorkout