import React, { useState, useEffect, useCallback } from 'react';
import { db } from '/src/firebase/firebase.js'; // Import Firebase config
import { doc, updateDoc } from 'firebase/firestore';
import { useExercise } from '../../contexts/workoutContexts/exerciseContext';
import { useAuth } from '../../contexts/authContexts/authContext';
import {debounce} from "lodash";



export function ExerciseNotes({exercise}) {

	const { selectedExercise} = useExercise()
	const {currentUser} = useAuth()
 	const [notes, setNotes] = useState(selectedExercise.addedNotes || '');



  useEffect(() => {
    setNotes(selectedExercise.addedNotes || ''); // Reset notes if selected exercise changes
  }, [selectedExercise]);

  // Automatically update notes in Firestore when the notes change
  const addNotesToExerciseInfo = async (exercise, notes) => {
    if (!currentUser || !exercise || !notes) {
      console.error("User not logged in or missing exercise data");
      return;
    }

    try {
      const exerciseRef = doc(db, `users/${currentUser.uid}/favorites/${exercise.id}`);
      await updateDoc(exerciseRef, { addedNotes: notes });
      console.log("Notes updated successfully in Firebase");
    } catch (error) {
      console.error("Error updating notes in Firebase:", error);
    }
  };

  //debounce notes updates
  const debouncedNotes = useCallback (
	debounce((exercise, notes) => {
		if(exercise && exercise.id) {
		addNotesToExerciseInfo(exercise, notes)
		}
	},300), [addNotesToExerciseInfo]
)

  useEffect(() => {
    setNotes(selectedExercise.addedNotes || ''); // Reset notes if selected exercise changes
  }, [selectedExercise]);

  const handleNotesChange = (e) => {
    const updatedNotes = e.target.value;
    setNotes(updatedNotes); // Update notes as the user types
    debouncedNotes(selectedExercise, updatedNotes); // Trigger debounce
  };
  return (
    <div>
      <textarea
	  className='w-full h-full p-3 text-sm rounded-lg bg-bg-white bg-opacity-70'
        value={notes}
        onChange={handleNotesChange}
        placeholder="Add notes for this exercise"
        rows="4"
        cols="50"
      />
    </div>
  );
}

