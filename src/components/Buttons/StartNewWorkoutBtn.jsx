import React from 'react'
import { useWorkout } from '../../contexts/workoutContexts/workoutContext'

const StartNewWorkoutBtn = () => {
	const {addedExerciseIds,startNewWorkout} = useWorkout()

  return (
	<>
		{addedExerciseIds && addedExerciseIds.length>0 && <button 
				className='btn-secondary text-sm mt-auto w-[85%]'
				onClick={startNewWorkout}>
					Add {addedExerciseIds.length} exercise{addedExerciseIds.length>1 ? "s" : ""}
				</button>}
	</>
  )
}

export default StartNewWorkoutBtn