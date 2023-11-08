import './App.css';
import tea from './Assets/response.json'
import Navbar from './Components/Navbar';
import TeaCard from './Components/TeaCard';

function App() {
  return (
    <>
      <div className="App">
        <nav>
          <Navbar />
        </nav>
        <div className="Tea">
          {tea.map((tea) => <TeaCard key={tea._id} tea={tea} /> )}
        </div>
      </div>
    </>
  );
}

export default App;
