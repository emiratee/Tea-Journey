import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import Navbar from './Components/Navbar';
import auth from './Utils/auth';

function App() {
  const initialState = auth.isAuthenticated()
  const [isAuthenticated, setIsAuthenticated] = useState(initialState);

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
