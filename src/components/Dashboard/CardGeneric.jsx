import React from 'react'
import { IoMdHeartEmpty } from "react-icons/io";
import BtnFavoriteList from '../Buttons/BtnFavoriteList';


const CardGeneric = ({exerciseName,primMuscle, secMuscle, imgSrc, bgColor}) => {
  return (
    <div className={`${bgColor} grid grid-cols-[1fr_1fr_auto] w-full p-3 rounded-md text-white  overflow-hidden h-full `} >
		
		<img src={imgSrc} alt="" className='object-cover w-full min-w-[90%] h-full rounded-md' />
		

		<div className='w-full h-full p-2'>
			<h4 className='font-bold text-md'>{exerciseName}</h4>
			<div className='flex gap-1 my-3'>
				
				<div className='rounded-full bg-gray-200  text-sm text-gray-900 font-semibold px-2 py-1'>{primMuscle}</div>
				{secMuscle.map(muscle => (
					<div className='rounded-full bg-gray-200  text-sm text-gray-900 font-semibold px-2 py-1'>{muscle}</div>

				))}
			</div>
			<BtnFavoriteList className="bg-bg-primary"/>
		</div>
		<IoMdHeartEmpty className=''/> 
	</div>
  )
}

export default CardGeneric