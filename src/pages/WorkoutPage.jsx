import React, {useState, useEffect} from 'react'
import { useExercise } from '../contexts/exerciseContext'
import DropdownMuscleGroups from '/src/components/dropdowns/DropdownMuscleGroups.jsx';
import DropdownEquipment from '/src/components/dropdowns/DropdownEquipment';

const WorkoutPage = ( ) => {
  const {exercises, fetchAllExercises, loading, error} = useExercise();
  const [searchInput, setSearchInput] =useState("")

  //fetch the exercises from API (function from exerciseContext)
  useEffect(() => {
    fetchAllExercises()
  }, [])

  //filter exercise data to match search bar input
  const filteredExercises = exercises.filter(exercise => 
    exercise.normalizedName.includes(searchInput.replaceAll(/[-_ ]/g, "").toLowerCase().trim()) //equalizes all spellings (push-up, push up, pushup)
  
  )
  //map all individual exercises that match the search query, or show all if query is empty, show exercise as li
  const exerciseList = filteredExercises.map(exercise => (
    <li key={exercise} className="list-none">{exercise.originalName}</li>
  ))

const handleSearchChange = (e) => {
  setSearchInput(e.target.value)
}
  return (
    <>
    <div className='w-screen flex content-center justify-center bg-bg-white'>
     
      <div className='w-auto p-4 flex content-center justify-start flex-col'>  {/* search bar section */}
        <div className=''>
        <label htmlFor="searchbar-exercise"></label>
        <input type="text" 
                id='searchbar-exercise' 
                placeholder='Search Exercise' 
                value={searchInput}
                onChange={handleSearchChange}
                className=' border-black border-solid border-4'/>
        <button type='submit'>Search</button>
        <div className='flex'>
          <button>&hearts;	</button>
          <DropdownMuscleGroups />
          <DropdownEquipment />
        </div>
        </div>
      
        <div>
          {loading && <p>Loading exercises...</p>}
          {error && <p>Error: {error}</p>}
          {exerciseList.length > 0 ? 
            exerciseList : <p>No exercises found</p>}
        </div>
   </div>
   </div>
    </>
	
  )
}

export default WorkoutPage