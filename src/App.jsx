// import { useState } from 'react';
import React from 'react';
import {
	BrowserRouter as Router,
  } from "react-router-dom";
import AppRoutes from './routes';
import './styles.css'
import { AuthProvider } from './contexts/authContexts/authContext';
import { ExerciseProvider } from './contexts/workoutContexts/exerciseContext';
import { WorkoutProvider } from './contexts/workoutContexts/workoutContext';


function App() {
 return ( 
	<AuthProvider>
		<ExerciseProvider>
			<WorkoutProvider>
			
				<Router basename="/pumppals-fitness-tracker">
					<AppRoutes /> 
				</Router>
			</WorkoutProvider>
		</ExerciseProvider>
	</AuthProvider>
 )
}

export default App;
