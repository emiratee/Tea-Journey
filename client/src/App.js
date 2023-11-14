import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import auth from './Utils/auth';
import { getUser } from './apiService';

function App() {
  const initialState = auth.isAuthenticated();
  const [isAuthenticated, setIsAuthenticated] = useState(initialState);
  const [userInfo, setUserInfo] = useState();

  const token = localStorage.getItem('accessToken');
  useEffect(() => {
    (async () => {
      if (token) {
        const user = await getUser(token);
        setIsAuthenticated(true);
        setUserInfo(user.user_info);
      }
    })();
  }, [token, setIsAuthenticated, setUserInfo]);

  return (
    <>
      <div className="App">
        <Router>
          <Dashboard
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
            userInfo={userInfo}
          />
        </Router>
      </div>
    </>
  );
}

export default App;