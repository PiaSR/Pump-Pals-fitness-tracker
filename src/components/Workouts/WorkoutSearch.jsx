import React, {useState, useEffect, useCallback} from 'react'
import { useExercise } from '/src/contexts/workoutContexts/exerciseContext'
import { useWorkout } from '/src/contexts/workoutContexts/workoutContext'

import { IoMdSearch } from "react-icons/io";
import { FaCirclePlus } from "react-icons/fa6";
import { FaMinusCircle } from "react-icons/fa";



import DropdownMuscleGroups from '/src/components/Workouts/dropdowns/DropdownMuscleGroups.jsx';
import DropdownEquipment from '/src/components/Workouts/dropdowns/DropdownEquipment';
import BtnFavoriteList from '/src/components/Buttons/BtnFavoriteList.jsx';
import StartNewWorkoutBtn from '/src/components/Buttons/StartNewWorkoutBtn'
import { useNavigate } from 'react-router-dom';
import LoadingScreen from '../Common/LoadingScreen';


const WorkoutSearch = () => {

	const {exercises , fetchAllExercises,fetchExercisesByMuscle, fetchExercisesByEquipment, getExerciseByIdObject, loading, error} = useExercise();
	const {addedExerciseIds,setAddedExerciseIds,handleAddExercise,handleRemoveExercise,startNewWorkout} = useWorkout()
	const [searchInput, setSearchInput] =useState("");
	const [muscleGroup, setMuscleGroup] = useState("");
	const [equipment, setEquipment] = useState("");
	
	const navigate = useNavigate()
	
  
	//fetch the exercises from API (function from exerciseContext)
	useEffect(() => {
	  fetchAllExercises()
	}, [fetchAllExercises])
  
  
   
	const handleSearchChange = (e) => {
	  setSearchInput(e.target.value)
	}

	const goToExerciseInfo = (id) => {
		getExerciseByIdObject(id)
		console.log("clicked on button, fetched data", id)
		navigate("/information")
	}


	const handleCancelBtn = () => {
		setAddedExerciseIds([])
		navigate(-1)
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
		return <LoadingScreen />
	  }
	
	  if (error) {
		return <p>Error: {error}</p>;
	  }
  

	 
	
	return (
		<div className='flex flex-col justify-evenly w-[100dvw]  h-[100dvh] sm:w-[80dvw] md:w-[70dvw] lg:max-w-4xl sm:h-[90dvh] p-3 sm:rounded-3xl '>
		
		{/* container for both search bar and UL */}
		
	   {/* flex items-start lg:items-center flex-col */}
	   {/* SEARCH BAR SECTION */}
			<div className='w-full lg:max-w-xl p-4 grid grid-cols-1 sm:rounded-t-3xl mt-6 mb-3'>  
			  
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
				<BtnFavoriteList onClick={() => navigate("/favorites")} />
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
			  {loading && <LoadingScreen /> }
			  {error && <p>Error: {error}</p>}
			  
			  {filteredExercises && filteredExercises.length > 0 
				? (
				<ul className='w-full min-w-[320px]'>
				  {filteredExercises.map((exercise) => (
					<li key={exercise.id} className="w-full list-none flex  flex-col hover:bg-bg-white hover:bg-opacity-30">
						
					  <div className='grid grid-cols-[1fr_auto] items-center text-md text-gray-700 px-12 py-8  '>
					  <div className='truncate' onClick={()=>goToExerciseInfo(exercise.id)} >
						{exercise.name} 
					  </div> 
					  {addedExerciseIds.some((exId)=> exId === exercise.id) ? (
							<FaMinusCircle className='text-2xl text-red-400 cursor-pointer' onClick={()=> handleRemoveExercise(exercise.id)}/>
					  ) : (
							<FaCirclePlus className='text-2xl text-gray-700 cursor-pointer' onClick={()=>handleAddExercise(exercise.id)} />
					  )}


					  </div>
					  <hr className='border-solid border-gray-200 w-full '/>
					</li>
				  ))}
				</ul>
			  ) : (
				<p>No exercises found</p>
			  )}
  
 			 
			  
			</div>
			
				<StartNewWorkoutBtn className="w-[85%]" />

				<button className='btn-secondary w-[85%] text-sm justify-self-end mt-3 bg-red-400' 
				onClick={handleCancelBtn}
				>Cancel
				</button>
			
		
	</div>
	 
	  
	)
}

export default WorkoutSearch