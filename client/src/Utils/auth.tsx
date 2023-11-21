import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { getUser } from '../apiService';
import Loading from '../Components/Information/Loading';
import { User } from '../../../interfaces/User';

interface AuthContextType {
  authenticated: boolean;
  userInfo: User;
  setUserInfo: React.Dispatch<React.SetStateAction<User>>;
  login: () => Promise<void>;
  logout: () => void;
  setToken: (token: string | null) => void;
  token: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const mockUserInfo: User = {
  user_id: 'mockUserId',
  name: 'Placeholder',
  username: 'Test',
  password: 'Test',
  favourite_tea: 'None',
  brewing_time: 0,
  brewed_teas: [],
  teas_drunken: 0,
  badges: [
    {
      name: 'Tea Noob',
      unlocked: true,
    },
    {
      name: 'Tea Hater',
      unlocked: false,
    },
    {
      name: 'Tea Expert',
      unlocked: false,
    },
    {
      name: 'Tea Lover',
      unlocked: false,
    },
    {
      name: 'Tea Enthusiast',
      unlocked: false,
    },
  ],
  reviews: [],
  average_rating: 0,
  joined_at: Date.now(),
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState<User>(mockUserInfo);
  const [accessToken, setAccessToken] = useState<string | null>(() =>
    localStorage.getItem('accessToken')
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (accessToken) {
      login();
    } else {
      setLoading(false);
    }
  }, [accessToken]);

  const login = async () => {
    setAuthenticated(true);
    if (accessToken) {
      const userResponse = await getUser(accessToken);
      if (userResponse.status === 200 && userResponse.user_info) {
        setUserInfo(userResponse.user_info);
        setLoading(false);
      }
    }
  };

  const logout = () => {
    setAuthenticated(false);
    localStorage.removeItem('accessToken');
    window.location.reload();
  };

  const setToken = (token: string | null) => setAccessToken(token);

  if (loading) {
    return <Loading />;
  }

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        userInfo,
        setUserInfo,
        login,
        logout,
        setToken,
        token: accessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
