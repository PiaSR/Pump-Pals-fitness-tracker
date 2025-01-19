import React, {useState, useEffect} from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import { useExercise } from '../../contexts/workoutContexts/exerciseContext';
import { useWorkout } from '../../contexts/workoutContexts/workoutContext'
import { TiTick } from "react-icons/ti";
import { useAuth } from '../../contexts/authContexts/authContext';
import { db } from "/src/firebase/firebase.js" 

import {  collection,  getDocs } from "firebase/firestore";


const ExerciseSetsEachExercise = ({exercise, index}) => {
	const [repsInput, setRepsInput] =useState(exercise.maxReps || "")
	const [weightInput, setWeightInput] = useState(exercise.maxWeight || "")
	

	const handleRepsInput = (e) => {
		setRepsInput(e.target.value)
	}
	const handleWeightInput = (e) => {
		setWeightInput(e.target.value)
	}
  return (
	<div 
			className='flex flex-col border border-solid border-gray-400 rounded-md p-5 my-6'
			key={exercise.id}
			>
		<div className='flex justify-between'>
			<div className='flex flex-col'>
				<h5 className='text-md text-gray-600 font-semibold'>{exercise.name}</h5>
				<p className='text-sm text-gray-500'>{exercise.equipment.charAt(0).toUpperCase() + exercise.equipment.slice(1)}</p>
			</div>
			<BsThreeDotsVertical className='text-gray-600'/>
			
		</div>


		<div className=' p-1 md:p-3 grid grid-cols-[auto_1fr_1fr_auto] justify-center items-center gap-3 md:gap-5 mt-3'>
			<div className='w-8 h-8 flex justify-center items-center text-gray-400 rounded-full border-solid border border-gray-400 p-2'>{index+1}</div>

			<input 
			type="number"
			value={repsInput}
			onChange={handleRepsInput}
			placeholder={exercise.maxReps > 0 ? `Max: ${exercise.maxReps}` : "Reps"}
			className='flex justify-center items-center border-gray-400 rounded-md border-solid border py-2 text-gray-500'>
				{/* {exercise.maxReps >0 
				? {maxReps}
				: "Reps"
				} */}
				
			</input>
			<input 
			type="number"
			value={weightInput}
			onChange={handleWeightInput}
			placeholder={exercise.maxWeight > 0 ? `Max: ${exercise.maxWeight}` : "Weight"}
			className='flex justify-center items-center border-gray-400 rounded-md border-solid border py-2 text-gray-500'>
			{/* {exercise.maxWeight >0 
				? {maxWeight}
				: "Weight"
				} */}
				
			</input>
			<div className='w-8 h-8 flex justify-center items-center rounded-full bg-gray-300'>
				<TiTick className='text-white text-2xl'/>
			</div>

		</div>
	</div>
  )
}

export default ExerciseSetsEachExercise