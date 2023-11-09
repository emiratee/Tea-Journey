import { useState, useEffect } from 'react';
import { getAllTeas } from './apiService';
import './App.css';
import BrewTimer from './Components/BrewTimer/BrewTimer';
import Navbar from './Components/Navbar';
import TeaCard from './Components/TeaCard';

function App() {
  const [teas, setTeas] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await getAllTeas();
      setTeas(data);
    })();
  }, []);

  return (
    <>
      <div className="App">
        <nav>
          <Navbar />
        </nav>
        <div className="Tea">
          {teas.map((tea) => <TeaCard key={tea._id} tea={tea} /> )}
        </div>
        <BrewTimer />
      </div>
    </>
  );
}

export default App;
