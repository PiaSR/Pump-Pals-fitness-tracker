// import { useState } from 'react';
import React from 'react';
import {
	BrowserRouter as Router,
  } from "react-router-dom";
import AppRoutes from './routes';
import './App.css'

function App() {
 return ( 
	<Router basename="/pumppals-fitness-tracker">
		<AppRoutes /> 
	</Router>
	
 )
}

export default App;
