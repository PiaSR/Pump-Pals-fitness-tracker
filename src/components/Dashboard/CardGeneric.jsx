import React from 'react'
import { IoMdHeartEmpty } from "react-icons/io";
import BtnFavoriteList from '../Buttons/BtnFavoriteList';


const CardGeneric = ({exerciseName, imgSrc, bgColor}) => {
  return (
    <div className={`${bgColor} grid grid-cols-[1fr_1fr_auto] w-full p-3 rounded-md text-white text-sm overflow-hidden h-full`} >
		
		<img src={imgSrc} alt="" className='object-fill w-full min-w-full h-full' />
		

		<div className='w-full'>
			<h4 className='font-bold'>{exerciseName}</h4>
			<div>
				
				<div className='rounded-full bg-gray-400 text-gray-900'>tag 1</div>
				
			</div>
			<BtnFavoriteList className="bg-bg-primary"/>
		</div>
		<IoMdHeartEmpty className='w-[4rem]'/> 
	</div>
  )
}

export default CardGeneric