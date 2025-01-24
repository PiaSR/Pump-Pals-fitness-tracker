import { Routes, Route, Navigate } from 'react-router-dom';
import React, { useContext } from 'react';
import { useAuth } from './contexts/authContexts/authContext';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import WorkoutPage from './pages/WorkoutPage';
import ExerciseInfoPage from './pages/ExerciseInfoPage';
import DashboardPage from './pages/DashboardPage';
import ProgressPage from './pages/ProgressPage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';
import FavoriteExercisesListPage from './pages/FavoriteExercisesListPage';
import SavedWorkoutPage from './pages/SavedWorkoutPage';


const AppRoutes = () => {
  const {currentUser, loading} = useAuth()
  

  if(loading) {
    return <div>Loading...</div>
  } 
  
const RequireAuth =({children}) => {
  console.log("current user", currentUser)
  return currentUser ? children : <Navigate to='/login' />
}

 return (
    <Routes>
      
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route path="/" element={<RequireAuth><HomePage /></RequireAuth>} />
      <Route path="/library_workout" element={<RequireAuth><SavedWorkoutPage /></RequireAuth>} />
      <Route path="/dashboard" element={<RequireAuth><DashboardPage /></RequireAuth>} />
      <Route path="/workout" element={<RequireAuth><WorkoutPage /></RequireAuth>} />
      <Route path="/information" element={<RequireAuth><ExerciseInfoPage /> </RequireAuth>}/>
      <Route path="/favorites" element={<RequireAuth><FavoriteExercisesListPage /></RequireAuth>} />
      <Route path="/progress" element={<RequireAuth><ProgressPage /></RequireAuth>} />
      <Route path="/profile" element={<RequireAuth><ProfilePage/></RequireAuth>}/>
      <Route path="*" element={<NotFoundPage />} />
      console.log(path)
    </Routes>
  
)
};

export default AppRoutes;
