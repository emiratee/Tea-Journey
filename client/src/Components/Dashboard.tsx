import { useRoutes, Navigate } from 'react-router-dom';
import ErrorPage from './ErrorPage';
import Home from './Home';
import Login from './Login/Login';
import Profile from './Profile/Profile';
import Register from './Register/Register';
import React from 'react';

const Dashboard = () => {
  return useRoutes([
    { path: '/', element: <Navigate to={'/dashboard'} /> },
    { path: '/dashboard', element: <Home /> },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
    { path: '/profile', element: <Profile setIsProfileModalOpen={function (isOpen: boolean): void {
      throw new Error('Function not implemented.');
    } } /> },
    { path: '*', element: <ErrorPage /> },
  ]);
};

export default Dashboard;
