import React from 'react'
import { MdOutlineKeyboardArrowRight } from "react-icons/md";


const ArrowRightCarousel = ({ onClick, ...rest }) => {
	const {
		onMove,
		carouselState: { currentSlide, deviceType }
	  } = rest;
	  return (
		<button 
		  onClick={onClick} 
		  className="absolute right-0 top-1/2 transform -translate-y-1/2  text-gray-500 font-bold  p-2 rounded-full hover:bg-gray-600"

		>
		  <MdOutlineKeyboardArrowRight size={40} />
		</button>
	  );
}

export default ArrowRightCarousel