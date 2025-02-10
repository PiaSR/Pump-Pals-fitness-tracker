import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { useWorkout } from '../../contexts/workoutContexts/workoutContext'

export const SelectWorkoutOption = () => {

	const {workoutStarted, setWorkoutStarted} = useWorkout()
	const navigate = useNavigate()

	const goToSearch = () => {
		setWorkoutStarted(false)
		navigate("/workout")
	}

	const handleCancelClick =() => {
		setWorkoutStarted(false)
	}

	
	return (
		<div className='flex flex-col justify-center items-center pb-5 px-8 w-[100dvw]  h-[100dvh] sm:w-[80dvw] md:w-[70dvw] lg:max-w-4xl sm:h-[90dvh] bg-bg-white bg-opacity-30 sm:rounded-3xl sm:m-3'> 
		
		<div className='h-full flex flex-col justify-center items-center'>

    <h3 className='text-white w-8/12 text-center '>Select your workout option</h3>
    <p className=' text-gray-800 my-8 text-center text-sm w-8/12'>Do you want to start a new custom workout, or use a pre-set template?</p>

		
			<button 
				className='btn-secondary text-sm w-full my-4'
				onClick={()=>goToSearch()}
				> Create custom workout</button>
			<button 
			className='btn-secondary text-sm w-full my-4 bg-opacity-70 bg-[#088c88]'
			
			>Use a template</button>

</div>	

			<button className='btn-secondary w-full text-sm  bg-red-400 mt-auto' onClick={handleCancelClick}>Cancel</button>

		
  </div>
	  // <ExerciseInfo />
	  )
	}
