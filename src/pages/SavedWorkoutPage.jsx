import React from 'react'
import ShowSavedWorkout from '../components/Homepage/ShowSavedWorkout'
import { useWorkout } from '../contexts/workoutContexts/workoutContext'

const SavedWorkoutPage = () => {
	const {selectedWorkout} = useWorkout()


  return (
	<div>
		{selectedWorkout && <ShowSavedWorkout />}
	</div>
  )
}

export default SavedWorkoutPage