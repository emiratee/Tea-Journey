import Watch from '../../Assets/watch.png';
import '../../Styles/BrewTimer.css';
import teas from '../../Assets/response.json';
import { useState, useEffect } from 'react';
import BrewTimerSearchbar from './BrewTimerSearchbar';
import BackArrow from '../../Assets/back.png'

const BrewTimer = () => {
    const [searchedTeas, setSearchedTeas] = useState([]);
    const [selectedTea, setSelectedTea] = useState();
    const [currentInterval, setCurrentInterval] = useState();



    function toggleTimer(e) {
        e.preventDefault();
        console.log('toggle');
    }

    function searchTea(name) {
        if (name === '') return setSearchedTeas([]);
        let filteredTeas = teas.filter((tea) => tea.name.includes(name)).slice(0, 4);
        setSearchedTeas(filteredTeas);
    }

    function renderTimer(time) {
        const seconds = time * 60;
        const secondsDisplay = seconds % 60;
        return `${time}:${secondsDisplay < 10 ? '0': ''}${secondsDisplay}`
    }

    function startTimer(e) {
        let seconds = selectedTea.brewTime * 60;
        seconds--

        const interval = setInterval(() => {
            if (seconds === 0) {
                clearInterval(interval);
            }
            const minutesDisplay = Math.floor(seconds / 60);
            const secondsDisplay = seconds % 60;
            document.querySelector('.Timer').innerHTML = `${minutesDisplay}:${secondsDisplay < 10 ? '0' : ''}${secondsDisplay}`
            seconds--;
        }, 1000);
        setCurrentInterval(interval)
    }

    function back() {
        setSelectedTea();
        setSearchedTeas([]);
        clearInterval(currentInterval);
    }

    return (
        <>
            <div className='BrewTimerButton'>
                <img src={Watch} alt="Watch" onClick={toggleTimer} />
            </div>
            <div className="BrewTimer">
                {!selectedTea && (
                    <>
                        <h1>Brew Timer</h1>
                        <div className="Searchbar">
                            <label htmlFor="search">Search your tea:</label>
                            <input type="text" name='search' placeholder='Type here' onChange={(e) => { searchTea(e.target.value) }} />
                            {searchedTeas.length > 0 && (
                                <div className="SearchedTeas">
                                    {searchedTeas.map(tea => { return <BrewTimerSearchbar key={tea.name} tea={tea} setSelectedTea={setSelectedTea} /> })}
                                </div>
                            )}
                        </div>
                    </>
                )}
                {selectedTea && (
                    <>
                        <div className="BrewTimerPage">
                            <h1>Brew Timer</h1>
                            <div className='Back'>
                                <img src={BackArrow} alt="Back" onClick={back} />
                            </div>
                            <div className="TeaTimer">
                                <h1 className="Timer">{renderTimer(selectedTea.brewTime)}</h1>
                                <h4 className="Hint">Hey ho</h4>
                                <button type="submit" onClick={startTimer}>Start</button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default BrewTimer