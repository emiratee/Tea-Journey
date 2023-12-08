import { createContext, useContext, useEffect, useState } from 'react';
import { getUser } from '../apiService';
import Loading from '../Components/Information/Loading';
const AuthContext = createContext();

const mockUserInfo = {
    username: 'Test',
    favourite_tea: 'None',
    brewing_time: 0,
    brewed_teas: 'None',
    teas_drunken: 0,
    badges: [{
        name: 'Placeholder',
        unlocked: true
    }],
    reviews: 'None',
    average_rating: 0,
    joined_at: 'Now'
}

export const AuthProvider = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [userInfo, setUserInfo] = useState(mockUserInfo);
    const [accessToken, setAccessToken] = useState(() => localStorage.getItem('accessToken'));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        accessToken ? login() : setLoading(false);
    }, [accessToken, setLoading]);

    const login = async () => {
        if (accessToken) {
            setAuthenticated(true);
            const user = await getUser(accessToken);
            setUserInfo(user.user_info);
            setLoading(false);
        }
    };

    const logout = () => {
        setAuthenticated(false);
        localStorage.removeItem('accessToken');
        window.location.reload();
    };

    const setToken = (token) => setAccessToken(token);

    const token = accessToken;

    if (loading) {
        return (
            <Loading />
        )
    }

    return (
        <AuthContext.Provider value={{ authenticated, userInfo, setUserInfo, login, logout, setToken, token }}>
            {children}
        </AuthContext.Provider>
    );
};



export const useAuth = () => {
    return useContext(AuthContext);
}