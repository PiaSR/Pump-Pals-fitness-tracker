import React from 'react'
import { IoMdHeartEmpty } from "react-icons/io";
import BtnFavoriteList from '../Buttons/BtnFavoriteList';


const CardGeneric = ({exerciseName, imgSrc, bgColor}) => {
  return (
    <div className={`${bgColor} grid grid-cols-[1fr_1fr_auto] w-[280px] p-3 rounded-md`} >
		
		<img src={imgSrc} alt="" className='object-fill w-full ' />
		

		<div className='w-full'>
			<h4>{exerciseName}</h4>
			<div>
				map tags for prim and sec muscle groups
				<div className='rounded-full bg-gray-400 text-gray-900'>tag 1</div>
				
			</div>
			<BtnFavoriteList className="bg-bg-primary"/>
		</div>
		<IoMdHeartEmpty className='w-[4rem]'/> go to favorites
	</div>
  )
}

export default CardGeneric