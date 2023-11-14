import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import { useAuth } from './Utils/auth';
import { getUser } from './apiService';

function App() {
  //TODO: convert to context (?)
  const { authenticated, login, token } = useAuth();
  const [userInfo, setUserInfo] = useState();
  useEffect(() => {
    (async () => {
      if (authenticated) {
        const user = await getUser(token);
        login();
        setUserInfo(user.user_info);
      }
    })();
  }, [authenticated, login, setUserInfo]);

  return (
    <>
      <div className="App">
        <Router>
          <Dashboard
            userInfo={userInfo}
          />
        </Router>
      </div>
    </>
  );
}

export default App;