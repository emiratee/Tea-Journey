import React from 'react';
import { useRoutes, Navigate } from 'react-router-dom';
import ErrorPage from './ErrorPage';
import Home from './Home';
import Login from './Login/Login';
import Profile from './Profile/Profile';

const Dashboard = ({ isAuthenticated, setIsAuthenticated }) => {
    const element = useRoutes([
        { path: '/', element: <Navigate to={'/dashboard'} /> },
        { path: '/dashboard', element: <Home isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} /> },
        { path: '/login', element: <Login setIsAuthenticated={setIsAuthenticated} /> },
        { path: '/profile', element: <Profile /> },
        { path: '*', element: <ErrorPage /> }
    ])

    return element;
};

export default Dashboard;



/*
user_id uuidv4
password sha256
favourite_tea: tea._id
brewing_time: keep count -> array
most_brewed_tea: look into brew time
teas_drunken: counter
badges: arr
day_streak: counter
reviews: array and the lenght of it
avg_rating: look into reviews and calc middle
*/