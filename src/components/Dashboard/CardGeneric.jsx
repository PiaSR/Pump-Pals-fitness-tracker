import React from 'react'
import { IoMdHeartEmpty } from "react-icons/io";
import BtnFavoriteList from '../Buttons/BtnFavoriteList';


const CardGeneric = ({exerciseName}) => {
  return (
	<div className='bg-bg-white bg-opacity-60 grid grid-cols-[1fr_1fr_auto] w-full  p-3 rounded-md'>
		<div className='w-full'>
		<img src='' alt="" className='object-contain w-full' />
		</div>

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