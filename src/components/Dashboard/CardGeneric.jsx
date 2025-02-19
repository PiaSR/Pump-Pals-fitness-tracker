import React from 'react'
import { IoMdHeartEmpty } from "react-icons/io";


const CardGeneric = ({title,primMuscle, secMuscle, imgSrc, bgColor}) => {
  return (
<div  className={`${bgColor} grid grid-cols-[35%_1fr_auto] justify-center w-full max-w-[95%] md:max-w-[85%] p-3 rounded-md text-white h-full`}>
		
		
		<div className="w-full h-full rounded-md">
        <img src={imgSrc} alt="" className="object-cover w-full h-full rounded-md" />
      </div>

		

		<div className='flex flex-col p-2'>
			<h4 className='font-bold text-sm sm:text-md'>{title}</h4>
			<div className='flex flex-wrap gap-1 my-3'>
				
				{primMuscle?.map(muscle =>   (
					<div className='rounded-full bg-gray-200 text-xs  md:text-sm text-gray-900 font-semibold px-2 py-1'>{muscle}</div>
				))}
				
				{secMuscle?.map(muscle => (
					<div className='rounded-full bg-gray-200  text-xs  md:text-sm text-gray-900 font-semibold px-2 py-1'>{muscle}</div>

				))}
			</div>
			
		</div>
		<IoMdHeartEmpty className=''/> 
	</div>
  )
}

export default CardGeneric