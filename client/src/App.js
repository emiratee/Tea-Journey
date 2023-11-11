import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import auth from './Utils/auth';

function App() {
  const initialState = auth.isAuthenticated();
  const [isAuthenticated, setIsAuthenticated] = useState(initialState);
  const [userInfo, setUserInfo] = useState();

  const token = localStorage.getItem('accessToken');
  useEffect(() => {
      if (token) {
          setIsAuthenticated(true);
          auth.login();
      }
  }, [token, setIsAuthenticated]);

  return (
    <>
      <div className="App">
        <Router>
          <Dashboard isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        </Router>
      </div>
    </>
  );
}

export default App;
