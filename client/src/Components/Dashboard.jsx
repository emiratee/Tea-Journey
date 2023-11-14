import { useRoutes, Navigate } from 'react-router-dom';
import ErrorPage from './ErrorPage';
import Home from './Home';
import Login from './Login/Login';
import Profile from './Profile/Profile';
import Register from './Register/Register';

const Dashboard = () => {
    const element = useRoutes([
        { path: '/', element: <Navigate to={'/dashboard'} /> },
        { path: '/dashboard', element: <Home /> },
        { path: '/login', element: <Login /> },
        { path: '/register', element: <Register /> },
        { path: '/profile', element: <Profile /> },
        { path: '*', element: <ErrorPage /> }
    ])

    return element;
};

export default Dashboard;