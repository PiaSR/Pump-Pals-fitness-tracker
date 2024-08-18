import { Routes, Route } from 'react-router-dom';
import React from 'react';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import WorkoutPage from './pages/WorkoutPage';
import DashboardPage from './pages/DashboardPage';
import ProgressPage from './pages/ProgressPage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';
import { useLocation } from 'react-router-dom';

const AppRoutes = () => {
  const location = useLocation();
  
  
  React.useEffect(() => {
    console.log('Current path:', location.pathname);
  }, [location]);
  
 return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/workout" element={<WorkoutPage />} />
      <Route path="/progress" element={<ProgressPage />} />
      <Route path="/profile" element={<ProfilePage/>}/>
      <Route path="*" element={<NotFoundPage />} />
      console.log(path)
    </Routes>
  
)
};

export default AppRoutes;
