import React from 'react'
import { useExercise } from '../../contexts/exerciseContext'

const CreateNewWorkout = () => {
	const {workoutStarted} = useExercise()
	
  return (
	<div className='flex flex-col justify-start items-center pb-5 w-[100dvw]  h-[100dvh] sm:w-[80dvw] md:w-[70dvw] lg:max-w-4xl sm:h-[90dvh] bg-bg-white bg-opacity-60 sm:rounded-3xl sm:m-3'>

		</div>
  )
}

export default CreateNewWorkout