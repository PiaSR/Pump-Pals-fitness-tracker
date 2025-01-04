import React from 'react'
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";


const BtnSetFavorite = ({onClick, isFavorite}) => {
  return (
	<button className=' rounded-full bg-transparent border-transparent px-4 py-2 flex items-center justify-center text-xl font-normal text-dark-grey hover:bg-gray-100  hover:text-gray-700 ' onClick={onClick}>
    {isFavorite ? (
         <MdFavorite className="text-red-600" />
    ) : (
        <MdFavoriteBorder className='text-gray-500' />
    )
  }
   
         
  </button>
  )
}

export default BtnSetFavorite