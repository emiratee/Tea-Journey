import { createContext, useContext, useEffect, useState } from 'react';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [accessToken, setAccessToken] = useState(() => localStorage.getItem('accessToken'));

    useEffect(() => {
        if (accessToken) login();
    }, [accessToken]);

    const login = () => {
        setAuthenticated(true);
    };

    const logout = () => {
        setAuthenticated(false);
        localStorage.removeItem('accessToken');
        window.location.reload();
    };

    const token = accessToken;

    const setToken = (token) => {
        setAccessToken(token);
    }

    return (
        <AuthContext.Provider value={{ authenticated, login, logout, token, setToken }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}

// class Auth {
//     constructor() {
//         this.authenticated = false;
//     }

//     login() {
//         this.authenticated = true;
//         document.querySelector('.Journey').classList.remove('JourneyBlurred');
//         document.querySelector('.Explore').classList.remove('ExploreBlurred');
//     }

//     logout() {
//         this.authenticated = false;
//         localStorage.removeItem('accessToken');
//         window.location.reload(); //Work around so I dont have to set everything to default
//     }

//     isAuthenticated() {
//         return this.authenticated;
//     }
// }

// export default new Auth();  