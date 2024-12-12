// import { useState } from 'react';
import React from 'react';
import {
	BrowserRouter as Router,
  } from "react-router-dom";
import AppRoutes from './routes';
import './styles.css'
import { AuthProvider } from './contexts/authContexts/authContext';
import { ExerciseProvider } from './contexts/exerciseContext';


function App() {
 return ( 
	<AuthProvider>
		<ExerciseProvider>
			
				<Router basename="/pumppals-fitness-tracker">
					<AppRoutes /> 
				</Router>
			
		</ExerciseProvider>
	</AuthProvider>
 )
}

export default App;
