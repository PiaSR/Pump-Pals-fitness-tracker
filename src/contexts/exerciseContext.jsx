
import React, { createContext, useState, useContext, useCallback , useEffect} from 'react';
import { db } from "/src/firebase/firebase.js" 
import { doc, setDoc, deleteDoc, updateDoc, collection, query, where, getDocs } from "firebase/firestore";
import { useAuth } from './authContexts/authContext';
import { Link, useNavigate } from "react-router-dom"


const ExerciseContext = createContext();

export function useExercise() {
  return useContext(ExerciseContext);
}

export function ExerciseProvider({ children }) {
  const [exercises, setExercises] = useState([]);
  const [allExercises, setAllExercises] = useState([]); //to cache full exercise list
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [notes, setNotes] = useState('')
  const {currentUser} = useAuth()
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const BASE_URL = "https://exercise-db-fitness-workout-gym.p.rapidapi.com";
  const HEADERS = {
  "X-RapidAPI-Key": "c3902f426bmsha9b827a6c78df6ap14171ejsn86d243dde4cd",
  "X-RapidAPI-Host": "exercise-db-fitness-workout-gym.p.rapidapi.com"
};

  //memoizing fetch function
  const fetchExercises = useCallback(async (endpoint) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {headers: HEADERS});
      if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);
      const data = await response.json()
     
     return data; //raw data to be used in further calls

    } catch (error) {
      console.log('error fetching exercises:', error);
      setError(error.message);
    } finally {
      setLoading(false)
    }
  }, [])


  //IF NO FILTER IS APPLIED, WE NEED FULL LIST OF EXERCISES (ONLY IDs, NOT FULL OBJECTS AVAILABLE)
  const fetchAllExercises = useCallback(async () => {
    if (allExercises.length > 0) {
      setExercises(allExercises);
      return;
    }

        const data = await fetchExercises('/exercises');
        if (data && data.excercises_ids) {
          const formattedExercises = data.excercises_ids.map((id) => ({
            id,
            name: id.replaceAll("_", " "), // "Push-Up"
            normalizedName: id.replaceAll(/[-_]/g, "").toLowerCase().trim(), // "pushup" 
          }));
          setAllExercises(formattedExercises); // Cache full list
          setExercises(formattedExercises); 
        }
  }, [fetchExercises, allExercises]);


  //fetch exercise object if no filter applied

  const fetchExerciseById = useCallback(async (id) => {

    const data =await fetchExercises(`/exercise/${id}`)
    console.log("Fetched exercise data:", data);
    if (data) {
      const individualExercise = ({
        id: data.id,
        name: data.name || "Unknown Name",
        normalizedName: (data.name || "").replaceAll(/[-_]/g, "").toLowerCase().trim() ,
        category: data.category || "",
        equipment: data.equipment || "",
        instructions: data.instructions || [],
        level: data.level || "",
        primaryMuscles: data.primaryMuscles || [],
        secondaryMuscles: data.secondaryMuscles || [],
        maxReps: 0,
        maxWeight: 0,
        addedNotes: ''
      });
   
      return individualExercise
    }  else {
      return null
    }
    
  }, [fetchExercises, setExercises])



  // Fetch exercises filtered by muscle
  const fetchExercisesByMuscle = useCallback(async (muscle) => {
   
        const data = await fetchExercises(`/exercises/muscle/${muscle}`);
        
        if (data) {
          const formattedExercises = data.map((exercise) => ({
            id: exercise.id,
            name: exercise.name,
            normalizedName: exercise.name.replaceAll(/[-_]/g, "").toLowerCase().trim(),
            category: exercise.category,
            equipment: exercise.equipment,
            level: exercise.level,
            primaryMuscles: exercise.primaryMuscles || [],
            secondaryMuscles: exercise.secondaryMuscles || [],
            maxReps: 0,
            maxWeight: 0
          }));
       
          setExercises(formattedExercises); // Set filtered exercises
        } 
  }, [fetchExercises]);

  // Fetch exercises filtered by equipment
  const fetchExercisesByEquipment = useCallback(async (equipment) => {
        const data = await fetchExercises(`/exercises/equipment/${equipment}`);
        if (data) {
          const formattedExercises = data.map((exercise) => ({
            id: exercise.id,
            name: exercise.name,
            normalizedName: exercise.name.replaceAll(/[-_]/g, "").toLowerCase().trim(),
            category: exercise.category,
            equipment: exercise.equipment,
            level: exercise.level,
            primaryMuscles: exercise.primaryMuscles || [],
            secondaryMuscles: exercise.secondaryMuscles || [],
            maxReps: 0,
            maxWeight: 0,
            addedNotes: ''
          }));
          setExercises(formattedExercises); // Set filtered exercises
        }
  }, [fetchExercises]);

  //function to get exercise object (for Favorites and Info)
  const getExerciseByIdObject = async (id) => {
    try {
      const individExercise = await fetchExerciseById(id)
      console.log("Exercise fetched and returned:", individExercise); 
      if(individExercise) {
        setSelectedExercise(individExercise)
        console.log('selected exercise:', selectedExercise)
        return individExercise
      }
      
    }
    catch (error) {
      console.error("Error fetching exercise by ID:", error);
      }
    }


    useEffect(() => {
      if (currentUser) {
        // Fetch user's favorite exercises from Firestore when they are logged in
        const fetchFavorites = async () => {
          const favoritesRef = collection(db, "favorites");
          
          const querySnapshot = await getDocs(favoritesRef);
          const favoriteExercises = querySnapshot.docs
          .filter(doc => doc.id.split('_')[0] === currentUser.uid)  // Check if the uid in docId matches
          .map(doc => doc.data());
          setFavorites(favoriteExercises);
        };
        fetchFavorites();
        console.log('user favorites are:', favorites)
      }
    }, [currentUser]); 



    async function addToFavorites(selectedExercise) {
      if (!selectedExercise || !currentUser) {
        console.error("Exercise or current user not found.");
        return;
      }

    
      try {
        const docId = `${currentUser.uid}_${selectedExercise.id}`;

        const isFavorite = favorites.some((fav) => fav.id === selectedExercise.id  );
       

        const exerciseDocRef = doc(db, "favorites", docId); // Unique doc for each exercise
    

        if (isFavorite) {
          //Remove from favorites list when clicking heart again
          await deleteDoc(exerciseDocRef);
          
          setFavorites((prevFavorites) => prevFavorites.filter((fav) => fav.id !== selectedExercise.id))
          console.log("Exercise removed from favorites:", selectedExercise);
        }

        if(!isFavorite) {
        // Add exercise to Davorites in firestore db
        await setDoc(exerciseDocRef, {
          ...selectedExercise,
          uid: currentUser.uid, // Add user-specific data
          addedAt: new Date(),
        });
    
        // Update local favorites state
        setFavorites((prevFavorites) => [...prevFavorites, selectedExercise]);
    
        console.log("Exercise added to favorites:", selectedExercise);
      }

      } catch (err) {
        console.error("Error toggling favorites:", err);
      }
    }

    useEffect(() => {
      console.log('Favorites updated:', favorites);
    }, [favorites]);

    async function addNotesToExerciseInfo (selectedExercise, notes) {
      if(!currentUser || !selectedExercise){
        console.error("User not logged in or no exercise selected");
        return;
      }

      try{
        const exerciseRef = doc(db, 'favorites', `${currentUser.uid}_${selectedExercise.id}` );
        await updateDoc(exerciseRef, {addedNotes: notes})
       console.log("Notes updates successfully in Firebase")
      
      setSelectedExercise((prevSelected) => {
        if(!prevSelected || prevSelected !== selectedExercise) return prevSelected
        return {...prevSelected, addedNotes: notes}
      })

      
        .catch((error)=> {
          console.error("Error updating notes in Firebase:", error)
        })
      }
      catch (error) {
        console.error("Error in function addNotesToExerciseInfo:", error)
      }
     
    
    }
    


const value = {
  exercises,
  favorites,
  notes,
  setNotes,
  getExerciseByIdObject,
  addToFavorites,
  addNotesToExerciseInfo,
  selectedExercise,
  allExercises,
  loading,
  error,
  fetchExerciseById,
  fetchExercisesByEquipment,
  fetchExercisesByMuscle,
  fetchAllExercises
}

  return (
    <ExerciseContext.Provider value={value}>
      {children}
    </ExerciseContext.Provider>
  );
}
