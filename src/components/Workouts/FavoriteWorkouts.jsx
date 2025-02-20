import React, {useState} from 'react'
import { useExercise } from '../../contexts/workoutContexts/exerciseContext';
import { MdArrowBackIos } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { FaCirclePlus } from "react-icons/fa6";
import { FaMinusCircle } from "react-icons/fa";

import { useWorkout } from '../../contexts/workoutContexts/workoutContext';
import StartNewWorkoutBtn from '/src/components/Buttons/StartNewWorkoutBtn'



const FavoriteWorkouts = () => {

  const { favorites, getExerciseByIdObject} = useExercise()
  const {addedExerciseIds,handleAddExercise,handleRemoveExercise,startNewWorkout} = useWorkout()

  const navigate = useNavigate()
	

	const handleClickBackArrow = () => {
		navigate(-1)
	}

  const goToExerciseInfo = (id) => {
		getExerciseByIdObject(id)
		console.log("clicked on button, fetched data", id)
		navigate("/information")
	}

  const startNewWorkoutFromFavorites = () => {
    navigate('/workout')
    startNewWorkout()
  }

  return (
	<div className='flex flex-col items-center pb-5 w-[100dvw]  h-[100dvh] sm:w-[80dvw] md:w-[70dvw] lg:max-w-4xl sm:h-[90dvh] bg-bg-white bg-opacity-60 sm:rounded-3xl sm:m-3 '>
    
      <div className='grid grid-cols-[auto_1fr] w-full content-center p-5 mt-8 '> 
           <MdArrowBackIos className='self-center ml-5' onClick={handleClickBackArrow} />
         
          <h3 className=' text-2xl justify-self-center -ml-5'>Favorite Workouts</h3>

      </div>
      
      
      <div className='overflow-y-auto overflow-x-hidden flex flex-col mt-6 w-full h-full content-center' > 
          
          {favorites && favorites.length > 0 
        ? (
          <ul className='w-full min-w-[320px]'>
            {console.log("favorites array:", favorites)}
            {favorites.map((exercise, index) => (
              <li key={index}
              className="w-full list-none flex  flex-col hover:bg-bg-white hover:bg-opacity-30">
              
                <div className='grid grid-cols-[1fr_auto] items-center text-md text-gray-700 px-12 py-8  '>
					  <div className='truncate' onClick={()=>goToExerciseInfo(exercise.id)} >{exercise.name} </div> 
            {addedExerciseIds.some((exId)=> exId === exercise.id) ? (
							<FaMinusCircle className='text-2xl text-red-400 cursor-pointer' onClick={()=> handleRemoveExercise(exercise.id)}/>
					  ) : (
							<FaCirclePlus className='text-2xl text-gray-700 cursor-pointer' onClick={()=>handleAddExercise(exercise.id)} />
					  )}
					  
					  </div>
					  <hr className='border-solid border-gray-200 w-full '/>
                </li>

                
              
            )
            )}
            
          </ul>
        )  
        : (
          <div className='flex flex-col content-center justify-center text-center w-80 p-5 mt-16'>
          <p className='text-lg font-bold'>No favorite exercises found! </p>
          <p className='text-sm mt-5'>To add to your Favorites, go back to the workout list, go to an exercise, and click on the heart in the top right corner.</p>
          </div>
        )}
      

        

    </div>

    <div className="flex justify-center w-full mt-auto">
    {addedExerciseIds && addedExerciseIds.length>0 && <button 
				className='btn-secondary text-sm mt-auto w-[85%]'
				onClick={()=>startNewWorkoutFromFavorites()}>
					Add {addedExerciseIds.length} exercise{addedExerciseIds.length>1 ? "s" : ""}
				</button>}
          </div>
    
    </div>
   
  
)}

export default FavoriteWorkouts