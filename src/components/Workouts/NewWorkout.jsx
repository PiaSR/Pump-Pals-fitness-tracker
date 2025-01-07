import React from 'react'
import { useExercise } from '../../contexts/exerciseContext'
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";




const NewWorkout = ({addedExerciseToWorkout, startNewWorkout}) => {
	

  return (
	<div className='flex justify-center items-center py-6 w-[100dvw]  h-[100dvh] sm:w-[80dvw] md:w-[70dvw] lg:max-w-4xl sm:h-[90dvh] bg-bg-white bg-opacity-60 sm:rounded-3xl '>
		
		<div className='flex flex-col w-9/12 h-full sm:h-[90%] p-4  '>
		{/* header */}
			<div className='flex flex-col '>
			<MdOutlineKeyboardArrowDown onClick={()=> startNewWorkout()} className='text-3xl'/>

			<h3 className=' text-2xl justify-self-center mt-6'>New Workout</h3>
			</div>


			{/* exercise container */}
			<div className='flex flex-col border border-solid border-gray-400 rounded-md p-5'>
				<div className='flex justify-between'>
					<div className='flex flex-col'>
						<h5 className='text-md text-gray-600 font-semibold'>exercise name</h5>
						<p className='text-sm text-gray-500'>equipment</p>
					</div>
					<BsThreeDotsVertical className='text-gray-600'/>
				</div>


			</div>

		</div>
	</div>
  )
}

export default NewWorkout