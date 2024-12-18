import React, { useState } from 'react'
import { MdArrowBackIos } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useExercise } from '../../contexts/exerciseContext';
import BtnSetFavorite from '../Buttons/BtnSetFavorite';



const ExerciseInfo = ({exercise}) => {
	const {addToFavorites} = useExercise()

	const navigate = useNavigate()
	const [notes, setNotes] = useState('')

	const handleClickBackArrow = () => {
		navigate(-1)
	}

	const handleNotesChange = (e) => [
		setNotes(e.target.value)
	]

	

	if (!exercise) return null;

  return (
	<div className='flex flex-col items-center h-[100dvh] min-w-[320px] sm:min-w-[600px] py-12 xs:py-20 pb-4 sm:h-[90dvh] bg-bg-white bg-opacity-60 sm:rounded-3xl sm:m-3'>
		<div className='flex flex-col w-9/12 h-full sm:h-[90%] pb-4 px-2 sm:px-8'>
				<div className='grid grid-cols-[auto_1fr_auto] content-center'>
					<MdArrowBackIos onClick={handleClickBackArrow} />
					<div className='flex flex-col items-center'>
						<h2 className='text-gray-800 text-xl font-bold'>{exercise.name}</h2>
						<p className='text-gray-500 text-sm '>{exercise.equipment.charAt(0).toUpperCase() + exercise.equipment.slice(1)}</p>
					</div>
					<BtnSetFavorite onClick={()=> addToFavorites()}	/>
				</div>


			{/* INSTRUCTIONS */}
				<div className='text-gray-800 overflow-scroll sm:overflow-visible mt-6 sm:mt-10'>
					<h4 className='font-bold mb-4'>Instructions</h4>
				<ol className='list-decimal ml-6 text-sm'>
				{exercise.instructions.map((step, index) => {
				return <li key={index}>
					{step}
					</li>
					})
				}
				</ol>
				</div>


			{/* NOTES SECTION */}
				<div className='w-full min-h-[20%] md:h-[40%] mt-7 pb-4 self-end'>
				<h4 className='font-bold mb-4'>Notes</h4>
				<textarea className='w-full h-full p-3 text-sm rounded-lg bg-bg-white bg-opacity-70' onChange={handleNotesChange}
				value={notes}/>
				</div>
			
			
		</div>
	</div>
  )
}

export default ExerciseInfo