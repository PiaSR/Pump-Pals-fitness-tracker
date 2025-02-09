import React, {useState, useEffect} from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import { useExercise } from '../../contexts/workoutContexts/exerciseContext';
import { useWorkout } from '../../contexts/workoutContexts/workoutContext'
import { TiTick } from "react-icons/ti";
import { useAuth } from '../../contexts/authContexts/authContext';
import { db } from "/src/firebase/firebase.js" 
import { PiPlusCircleThin } from "react-icons/pi";
import { FaGripLines } from "react-icons/fa";



const ExerciseSetsEachExercise = ({exercise,  key}) => {
	const {sets, setSets, updateExerciseSets} = useWorkout()
	const [collapseSets, setCollapseSets] = useState(false)
	
	const handleSetChange = (setIndex, key, value) => {
		const updatedSets = [...(sets[exercise.id] || [])];
		updatedSets[setIndex][key] = value;
		updateExerciseSets(exercise.id, updatedSets);
	};
	

	const handleAddAnotherSet = () => {
		// If no sets exist for this exercise, initialize with a default set
		if (!sets[exercise.id]) {
		  setSets(prevSets => ({
			...prevSets,
			[exercise.id]: [{ reps: exercise.maxReps > 0 ? exercise.maxReps : 0, weight: exercise.maxWeight > 0 ? exercise.maxWeight : 0, finishSet: false }]
		  }));
		  return;
		}
	  
		// If sets exist, add a new one based on the last set
		const lastSet = sets[exercise.id][sets[exercise.id].length - 1];
		setSets(prevSets => ({
		  ...prevSets,
		  [exercise.id]: [
			...prevSets[exercise.id], 
			{ reps: lastSet.reps, weight: lastSet.weight, finishSet: false }
		  ]
		}));
	  };
	

	const toggleFinishSet = (setIndex) => {
		const updatedSets = sets[exercise.id].map((set, i) =>
		  i === setIndex ? { ...set, finishSet: !set.finishSet } : set
		);
		setSets((prev) => ({ ...prev, [exercise.id]: updatedSets }));
	  };


	const handleCollapseSets = () => {
		setCollapseSets(!collapseSets)
	}

	
	
	
  return (
	<div 
			className='flex flex-col border border-solid border-gray-400 rounded-md p-5 my-6 w-full '
			key={key}
			>
		<div className='flex justify-between'>
			<div className='flex flex-col'>
				<h5 className='text-md text-gray-600 font-semibold'>{exercise.name}</h5>
				<p className='text-sm text-gray-500'>{exercise.equipment.charAt(0).toUpperCase() + exercise.equipment.slice(1)}</p>
			</div>
			<BsThreeDotsVertical className='text-gray-600'/>
			
		</div>

		{!collapseSets && sets[exercise.id] && sets[exercise.id].map((set, setIndex) => (
		<div className=' p-1 md:p-3 grid grid-cols-[auto_1fr_1fr_auto] justify-center items-center gap-2  mt-3 w-full ' key={setIndex}>
			<div className='w-7 h-7 flex justify-center items-center text-gray-400 rounded-full border-solid border border-gray-400 p-2 m-1 '>
				{setIndex+1}
			</div>

			<input 
			type="number"
			value={set.reps} //when new set is added, input fields should have same values as previous set
			onChange={(e) => handleSetChange(setIndex, 'reps', e.target.value)}
			placeholder={exercise.maxReps > 0 ? `Max: ${exercise.maxReps}` : "Reps"}
			className={`${set.finishSet? "bg-green-200" : "bg-white"} flex justify-center items-center border-gray-400 rounded-md border-solid border p-2 text-gray-500  w-full`}>
				
				
			</input>
			<input 
			type="number"
			value={ set.weight} //when new set is added, input fields should have same values as previous set
			onChange={(e) => handleSetChange(setIndex, 'weight', e.target.value)}
			placeholder={exercise.maxWeight > 0 ? `Max: ${exercise.maxWeight}` : "Weight"}
			className={`${set.finishSet? "bg-green-200" : "bg-white"} flex justify-center items-center border-gray-400 rounded-md border-solid border p-2 text-gray-500 w-full`}>
			
				
			</input>
			<div className={`${set.finishSet? "bg-green-600" : "bg-gray-300"} w-7 h-7 flex justify-center items-center rounded-full `}>
				<TiTick 
					className='text-white text-2xl'
					onClick={()=>toggleFinishSet(setIndex)}
				/>
			</div>

		</div>))}

		<div className='flex justify-between items-center relative mt-3'>
			<PiPlusCircleThin 
			className='text-gray-400 text-4xl cursor-pointer ml-1'
			onClick={()=>handleAddAnotherSet()} />

			<FaGripLines 
			className='text-gray-400 mt-4 absolute justify-self-center left-1/2 -translate-x-1/2 cursor cursor-pointer'
			onClick={()=>handleCollapseSets()}
			 />
				
			
		</div>
	</div>
  )
}

export default ExerciseSetsEachExercise