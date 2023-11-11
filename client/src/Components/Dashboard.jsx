import { useRoutes, Navigate } from 'react-router-dom';
import ErrorPage from './ErrorPage';
import Home from './Home';
import Login from './Login/Login';
import Profile from './Profile/Profile';

const Dashboard =({ isAuthenticated, setIsAuthenticated, userInfo }) => {
    const element = useRoutes([
        { path: '/', element: <Navigate to={'/dashboard'} /> },
        { path: '/dashboard', element: <Home isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} userInfo={userInfo} /> },
        { path: '/login', element: <Login setIsAuthenticated={setIsAuthenticated} /> },
        { path: '/profile', element: <Profile /> },
        { path: '*', element: <ErrorPage /> }
    ])

    return element;
};

export default Dashboard;