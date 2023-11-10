import React from 'react';
import { useRoutes, Navigate } from 'react-router-dom';
import Home from './Home';
import Login from './Login/Login';

const Dashboard = ({ isAuthenticated, setIsAuthenticated }) => {
    const element = useRoutes([
        { path: '/', element: <Navigate to={'/dashboard'} /> },
        { path: '/dashboard', element: <Home isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} /> },
        { path: '/login', element: <Login setIsAuthenticated={setIsAuthenticated} /> }
    ])

    return element;
};

export default Dashboard;
