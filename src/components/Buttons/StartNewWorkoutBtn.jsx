import React from 'react'
import { useWorkout } from '../../contexts/workoutContexts/workoutContext'

const StartNewWorkoutBtn = () => {
	const {addedExerciseIds,startNewWorkout} = useWorkout()

  return (
	<>
		{addedExerciseIds && addedExerciseIds.length>0 && <button 
				className='btn-secondary w-[85%] text-sm justify-self-end mt-8'
				onClick={startNewWorkout}>
					Add {addedExerciseIds.length} exercise{addedExerciseIds.length>1 ? "s" : ""}
				</button>}
	</>
  )
}

export default StartNewWorkoutBtn