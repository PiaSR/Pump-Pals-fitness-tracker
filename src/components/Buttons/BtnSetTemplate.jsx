import React, {useEffect} from 'react'
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { useWorkout } from '../../contexts/workoutContexts/workoutContext';



const BtnSetTemplate = ({onClick}) => {
  const { templates, selectedWorkout } = useWorkout();



  const isTemplate = templates.some((template)=> template.id === selectedWorkout.id)
  return (
	<button className='text-3xl mr-4 self-start' onClick={onClick}>
    {isTemplate ? (
         <MdFavorite className="text-red-600" />
    ) : (
        <MdFavoriteBorder className='text-gray-500' />
    )
  }
   
         
  </button>
  )
}

export default BtnSetTemplate
