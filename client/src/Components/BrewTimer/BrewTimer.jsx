import Watch from '../../Assets/watch.png';
import '../../Styles/BrewTimer.css';
import teas from '../../Assets/response.json';
import { useState } from 'react';
import BrewTimerSearchbar from './BrewTimerSearchbar';

const BrewTimer = () => {
    const [searchedTeas, setSearchedTeas] = useState([]);

    function toggleTimer(e) {
        e.preventDefault();
        console.log('toggle');
    }

    function searchTea(name) {
        let filteredTeas = teas.filter((tea) => tea.name.includes(name)).slice(0, 4);
        setSearchedTeas(filteredTeas);
        console.log(searchedTeas);
    }

    return (
        <>
            <div className='BrewTimerButton'>
                <img src={Watch} alt="Watch" onClick={toggleTimer} />
            </div>
            <div className="BrewTimer">
                <h1>Brew Timer</h1>
                <div className="Searchbar">
                    <label htmlFor="search">Search your tea:</label>
                    <input type="text" name='search' placeholder='Type here' onChange={(e) => { searchTea(e.target.value) }} />
                    {searchedTeas.length > 0 && (
                        <div className="SearchedTeas">
                            {searchedTeas.map(tea => { <BrewTimerSearchbar key={tea._id} tea={tea} /> })}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default BrewTimer