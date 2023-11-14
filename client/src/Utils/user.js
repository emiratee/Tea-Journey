import { createContext, useContext, useEffect, useState } from 'react';
import { getUser } from '../apiService';
import { useAuth } from './auth';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState();
    const { authenticated, token } = useAuth();

    useEffect(() => {
        if (authenticated) loadUserInfo();
    }, [authenticated])

    const loadUserInfo = () => {
        const user = await getUser(token);
        setUserInfo(user.user_info);
    };

    return (
        <UserContext.Provider value={{ userInfo }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    return useContext(UserContext);
}