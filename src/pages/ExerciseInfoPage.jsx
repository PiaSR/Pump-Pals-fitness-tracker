import React from 'react'
import ExerciseInfo from '../components/Workouts/ExerciseInfo'
import { useExercise } from '../contexts/exerciseContext'

const ExerciseInfoPage = ( ) => {
	const {selectedExercise} = useExercise()
  return (
	<>
	<ExerciseInfo exercise={selectedExercise}  />
	{console.log("exercise information")}
	</>	
  )
}

export default ExerciseInfoPage