import React from 'react'
import { useWorkout } from '../../contexts/workoutContexts/workoutContext'
import ExerciseSetsContainer from '../Workouts/ExerciseSetsContainer'
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import StartNewWorkoutBtn from '../Buttons/StartNewWorkoutBtn'

const ShowSavedWorkout = ({selectedWorkout, setSelectedWorkout, setWorkoutStarted}) => {

	const {startNewWorkout} = useWorkout()
	

	const goBackToLibrary = () => {
		setWorkoutStarted(false)
		setSelectedWorkout(null)
	}

  return (
	<div className='flex justify-center items-center flex-col py-6 w-[100dvw]  h-[100dvh] sm:w-[80dvw] md:w-[70dvw] lg:max-w-4xl sm:h-[90dvh] bg-bg-white bg-opacity-60 sm:rounded-3xl  '>{selectedWorkout && (

		<div className='flex flex-col w-10/12 md:w-9/12 h-full sm:h-[90%] p-4  '>
		{/* header */}
		  <div className='flex flex-col mb-10 '>
		  <MdOutlineKeyboardArrowDown onClick={()=> goBackToLibrary()} className='text-3xl text-gray-800'/>

		  <h3 className=' text-2xl justify-self-center mt-6 text-gray-800'>{`${selectedWorkout.workoutTitle}, ${selectedWorkout.addedAtFormatted}`}</h3>
		  </div>


		  {/* exercise container */}
		  <ExerciseSetsContainer  />


		  <button className='btn-secondary w-[85%] text-sm justify-self-end mt-8' 
			onClick={()=> startNewWorkout()}
			>Add Exercises
			</button>
		  
			<StartNewWorkoutBtn />
		</div>
	 
	  )}
</div>
  )
}

export default ShowSavedWorkout