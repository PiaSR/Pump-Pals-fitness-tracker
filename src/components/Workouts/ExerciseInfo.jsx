import React, { useEffect } from 'react'
import { useExercise } from '/src/contexts/exerciseContext'

const ExerciseInfo = ({exercise}) => {
	if (!exercise) return null;

	console.log("Rendering ExerciseInfo with:", exercise); 
  return (
	<div className='flex flex-col justify-start items-center h-[100dvh] min-w-[360px] sm:min-w-[600px] pb-6 sm:h-[90dvh] bg-bg-white bg-opacity-60 sm:rounded-3xl sm:m-3'>
		<li key={exercise.id}>
        <h2>{exercise.name}</h2>
        <p>Category: {exercise.category}</p>
        <p>Equipment: {exercise.equipment}</p>
        <p>Level: {exercise.level}</p>
        {/* Display other exercise details as needed */}
		{console.log('object name', exercise.name)}
      </li>
	</div>
  )
}

export default ExerciseInfo