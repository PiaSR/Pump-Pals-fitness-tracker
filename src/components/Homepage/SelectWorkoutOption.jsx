import React from 'react'
import {Link} from 'react-router-dom'
import { useWorkout } from '../../contexts/workoutContexts/workoutContext'

export const SelectWorkoutOption = () => {

	const {workoutStarted, setWorkoutStarted} = useWorkout()

	const handleCancelClick =() => {
		setWorkoutStarted(false)
	}

	
	return (
		<div className='flex flex-col justify-center items-center pb-5 px-8 w-[100dvw]  h-[100dvh] sm:w-[80dvw] md:w-[70dvw] lg:max-w-4xl sm:h-[90dvh] bg-bg-white bg-opacity-60 sm:rounded-3xl sm:m-3'> 
		
    <h3 className='text-white w-8/12 text-center '>Select your workout option</h3>
    <p className=' text-white mt-8 text-center text-xs'>Do you want to start a new custom workout, or use a pre-set template?</p>


    <button 
		className='btn-secondary text-sm w-full my-3 '
		><Link to='/workout'> Create custom workout</Link></button>
    <button 
      className='btn-secondary text-sm w-full my-3 bg-opacity-40'
      
    >Use a template</button>

    <button className='btn-secondary w-full text-sm justify-self-end bg-red-400' onClick={handleCancelClick}>Cancel</button>

  </div>
	  // <ExerciseInfo />
	  )
	}
