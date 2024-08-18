// import { useState } from 'react';
import React from 'react';
import {
	BrowserRouter as Router,
  } from "react-router-dom";
import AppRoutes from './routes';
import './styles.css'
import { AuthProvider } from './contexts/authContexts/authContext';

function App() {
 return ( 
	<AuthProvider>
		<Router basename="/pumppals-fitness-tracker">
			<AppRoutes /> 
		</Router>
	</AuthProvider>
 )
}

export default App;
