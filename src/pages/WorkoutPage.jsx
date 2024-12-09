import React, {useState, useEffect, useCallback, useRef} from 'react'
import { useExercise } from '../contexts/exerciseContext'
import { IoMdSearch } from "react-icons/io";

import DropdownMuscleGroups from '/src/components/Workouts/dropdowns/DropdownMuscleGroups.jsx';
import DropdownEquipment from '/src/components/Workouts/dropdowns/DropdownEquipment';



const WorkoutPage = ( ) => {
  const {exercises, fetchAllExercises,fetchExercisesByMuscle, fetchExercisesByEquipment, loading, error} = useExercise();
  const [searchInput, setSearchInput] =useState("");
  const [muscleGroup, setMuscleGroup] = useState("");
  const [equipment, setEquipment] = useState("");

  //fetch the exercises from API (function from exerciseContext)
  useEffect(() => {
    fetchAllExercises()
  }, [fetchAllExercises])


 
  const handleSearchChange = (e) => {
    setSearchInput(e.target.value)
  }

  const handleMuscleGroupChange = useCallback ( async (muscleGroup) => {
    setMuscleGroup(muscleGroup);
    try {
      await fetchExercisesByMuscle(muscleGroup);
    } catch (error) {
      console.error("Error fetching exercises by muscle:", error);
    }
    
  }, []);
  
//only fetch from the /muscle endpoint (in handleMuscleGroupChange) if a muscle group gets selected in the dropdown
useEffect(() => {
  if (muscleGroup && muscleGroup !== '') {
    handleMuscleGroupChange(muscleGroup)
  }
}, [muscleGroup,handleMuscleGroupChange ])

  const handleEquipmentGroupChange = useCallback ( async (equipment) => {
    setEquipment(equipment);
    try {
    await fetchExercisesByEquipment(equipment);
    } catch (error) {
      console.error("Error fetching exercises by equipment:", error);
    }
  }, []);

   //only fetch from the /equipment endpoint (in handleEquipmentGroupChange) if an equipment group gets selected in the dropdown
   useEffect(() => {
    if (equipment && equipment !== '') {
      handleEquipmentGroupChange(equipment)
    }
  }, [equipment,handleEquipmentGroupChange ])

  
  //filter exercise data to match search bar input and/or dropdown selection
  const filteredExercises = exercises.filter(exercise => {
   
   const matchesInput = searchInput === "" 
      ? true
      : exercise?.normalizedName?.includes(searchInput.replaceAll(/[-_ ]/g, "").toLowerCase().trim()) //equalizes all spellings (push-up, push up, pushup)

    const matchesMuscleGroup = muscleGroup 
          ? Array.isArray(exercise.primaryMuscles) &&
          exercise.primaryMuscles.some((muscle) => muscle.toLowerCase() === muscleGroup)
        : true;

    const matchesEquipment = equipment 
        ? exercise?.equipment === equipment
        : true;

    return matchesInput && matchesMuscleGroup && matchesEquipment
    })
   
  
    if (loading) {
      return <p>Loading exercises...</p>;
    }
  
    if (error) {
      return <p>Error: {error}</p>;
    }

  return (
    <div className='flex flex-col justify-center items-center max-h-[100dvh] sm:max-h-[90dvh] bg-bg-white bg-opacity-60 sm:rounded-3xl sm:m-3'>
      <div className='flex flex-col content-center justify-center p-0 m-0  w-full'>
     
          <div className=' p-4 flex content-center justify-start flex-col sm:rounded-t-3xl '>  {/* search bar section */}
            
          <div className="relative rounded-full flex ">
            <input
              type="text"
              value={searchInput}
              onChange={handleSearchChange}
              placeholder='Search Exercise'
              className="w-full pl-10 pr-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-slate-400"
              // ref={ref}
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 rounded-full pointer-events-none">
            <IoMdSearch className='text-gray-400' />
            </div>
            <button type='submit'>
              
              Search
              </button>
          </div>
        
       
          <div className='flex'>
            <button>&hearts;	</button>
            <DropdownMuscleGroups 
            
          setMuscleGroup={setMuscleGroup}
            
            />
            <DropdownEquipment  
            setEquipment={setEquipment}
            />
          </div>
          </div>
      
        

        </div>
          <div className='overflow-scroll' > {/* list section */}
            {loading && <p>Loading exercises...</p>}
            {error && <p>Error: {error}</p>}
            
            {filteredExercises.length > 0 
              ? (
              <ul>
                {filteredExercises.map((exercise) => (
                  <li key={exercise.id} className="list-none text-sm text-dark-grey">
                    {exercise.name}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No exercises found</p>
            )}

            
          </div>
      </div>
   
	
  )
}

export default WorkoutPage