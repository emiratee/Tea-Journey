import React from 'react';
import { useRoutes } from 'react-router-dom';
import Home from './Home';
import Login from './Login/Login';

const Dashboard = ({ isAuthenticated, setIsAuthenticated }) => {
    const element = useRoutes([
        { path: '/', element: <Home isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} /> },
        { path: '/login', element: <Login /> }
    ])

    return element;
};

export default Dashboard;
