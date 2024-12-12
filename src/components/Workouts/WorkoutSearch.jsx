import React, {useState, useEffect, useCallback} from 'react'
import { useExercise } from '/src/contexts/exerciseContext'
import { IoMdSearch } from "react-icons/io";
import { FaCirclePlus } from "react-icons/fa6";


import DropdownMuscleGroups from '/src/components/Workouts/dropdowns/DropdownMuscleGroups.jsx';
import DropdownEquipment from '/src/components/Workouts/dropdowns/DropdownEquipment';
import BtnFavorite from '/src/components/Workouts/BtnFavorite';

const WorkoutSearch = () => {
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
	<div className='flex flex-col justify-start items-center pb-5 w-[100dvw]  h-[100dvh] sm:w-[80dvw] md:w-[70dvw] lg:max-w-4xl sm:h-[90dvh] bg-bg-white bg-opacity-60 sm:rounded-3xl sm:m-3'>
		
		{/* container for both search bar and UL */}
		
	   {/* flex items-start lg:items-center flex-col */}
	   {/* SEARCH BAR SECTION */}
			<div className='w-full lg:max-w-xl p-4 grid grid-cols-1 sm:rounded-t-3xl mt-3 mb-2'>  
			  
					<div className="relative rounded-full flex gap-2 w-full ">
					<input
						type="text"
						value={searchInput}
						onChange={handleSearchChange}
						placeholder='Search Exercise'
						className="w-full pl-10 pr-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-slate-400 text-sm text-gray-700 "
						
					/>
					<div className="absolute inset-y-0 left-0 flex items-center pl-3 rounded-full pointer-events-none">
					<IoMdSearch className='text-gray-400' />
					</div>
			  {/* <button type='submit' className='bg-black rounded-full px-3 text-white w-1/4'>
				
				Search
				</button> */}
			</div>
		  
		 		
				{/* container for favorites and dropdowns */}
		 
				<div className='grid grid-cols-[auto_1fr_1fr] xs:grid-cols-3 place-items-center gap-2 lg:gap-4 mt-3 w-full lg:justify-center min-w-full '> 
				<div className="flex justify-center sm:justify-start">
				<BtnFavorite  />
				</div>
				<DropdownMuscleGroups 
				muscleGroup={muscleGroup}
				setMuscleGroup={setMuscleGroup}
			
				/>
				<DropdownEquipment  
				equipment={equipment}
				setEquipment={setEquipment}
				/>
				</div>
			</div>
	 
  
		  {/* LIST SECTION */}
  
			<div className='overflow-y-auto overflow-x-hidden flex' > 
			  {loading && <p>Loading exercises...</p>}
			  {error && <p>Error: {error}</p>}
			  
			  {filteredExercises.length > 0 
				? (
				<ul className='w-full'>
				  {filteredExercises.map((exercise) => (
					<li key={exercise.id} className="w-full list-none flex  flex-col hover:bg-bg-white hover:bg-opacity-30">
					  <div className='grid grid-cols-[1fr_auto] items-center text-sm text-gray-700 px-7 py-6  '>
					  <div className='truncate'>{exercise.name} </div> 
					  
					  <FaCirclePlus className='text-xl text-gray-700' />
					  </div>
					  <hr className='border-solid border-gray-200 w-full '/>
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

export default WorkoutSearch