import './App.css';
import { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import { useAuth } from './Utils/auth';

function App() {
  const { authenticated, login } = useAuth();
  useEffect(() => {
    (async () => {
      if (authenticated) await login();
    })();
  }, [authenticated, login]);

  return (
    <>
      <div className="App">
        <Router>
          <Dashboard />
        </Router>
      </div>
    </>
  );
}

export default App;