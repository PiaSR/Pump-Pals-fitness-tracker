import React, {useEffect} from 'react'
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { useExercise } from "/src/contexts/exerciseContext"



const BtnSetFavorite = ({onClick, exercise}) => {
  const { favorites } = useExercise();



  const isFavorite = favorites.some((fav)=> fav.id === exercise.id)
  return (
	<button className='text-2xl  ' onClick={onClick}>
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
//rounded-full bg-transparent border-transparent px-4 py-2 flex items-center justify-center text-xl font-normal text-dark-grey hover:bg-gray-100  hover:text-gray-700 