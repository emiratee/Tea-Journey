import Watch from '../../Assets/watch.png';
import '../../Styles/BrewTimer.css';
import teas from '../../Assets/response.json';
import { useState, useEffect } from 'react';
import BrewTimerSearchbar from './BrewTimerSearchbar';
import Back from '../../Assets/back.png';
import Close from '../../Assets/close.png';
import Leaves from '../../Assets/green-tea-leaves.png';
import { addBrewedTea, addTeaTime, getAllFunfacts } from '../../apiService';

//TODO: Refactor this crap

const BrewTimer = () => {
    const [searchedTeas, setSearchedTeas] = useState([]);
    const [funfacts, setFunfacts] = useState([]);
    const [selectedTea, setSelectedTea] = useState();
    const [currentInterval, setCurrentInterval] = useState();
    const [funfact, setFunfact] = useState('');
    const [trigger, setTrigger] = useState(false);
    const [countSeconds, setCountSeconds] = useState()

    useEffect(() => {
        (async () => {
            const data = await getAllFunfacts();
            setFunfacts(data);
            setTrigger(!trigger)
        })();
    }, []);

    useEffect(() => {
        if (selectedTea) {
            addBrewedTea(selectedTea, token)
        }
    }, [selectedTea])

    useEffect(() => {
        if (funfacts.length === 0) {
            setFunfact('')
            return
        }
        setTimeout(() => {
            setFunfact(funfacts[Math.floor(Math.random() * funfacts.length)].fact);
        }, 5000);

    }, [trigger, funfact]);

    function togglePopUp() {
        if (document.querySelector('.BrewTimer').style.display === 'none') {
            document.querySelector('.BrewTimer').style.display = 'flex'
        } else {
            document.querySelector('.BrewTimer').style.display = 'none'
        }
    }

    function searchTea(name) {
        if (name === '') return setSearchedTeas([]);
        let filteredTeas = teas.filter((tea) => tea.name.includes(name)).slice(0, 4);
        setSearchedTeas(filteredTeas);
    }

    function renderTimer(time) {
        const seconds = time * 60;
        const secondsDisplay = seconds % 60;
        return `${time}:${secondsDisplay < 10 ? '0' : ''}${secondsDisplay}`
    }

    function toggleTimer(e) {
        let seconds = selectedTea.brewTime * 60;
        seconds--;

        if (e.currentTarget.innerText === 'Reset') {
            addTeaTime(selectedTea.brewTime * 60 - countSeconds, token);
            clearInterval(currentInterval);
            e.currentTarget.innerText = 'Start';
            seconds = selectedTea.brewTime * 60;
            document.querySelector('.Timer').innerText = renderTimer(selectedTea.brewTime)
            return;
        }


        const interval = setInterval(() => {
            if (seconds === 0) {
                addTeaTime(selectedTea.brewTime * 60, token)
                clearInterval(interval);
                document.querySelector('.Timer').innerHTML = '0:00'
            } else {
                const minutesDisplay = Math.floor(seconds / 60);
                const secondsDisplay = seconds % 60;
                document.querySelector('.Timer').innerHTML = `${minutesDisplay}:${secondsDisplay < 10 ? '0' : ''}${secondsDisplay}`;
                seconds--;
                setCountSeconds(seconds)
            }
        }, 1000);

        setCurrentInterval(interval);
        e.currentTarget.innerText = 'Reset';
    }


    function back() {
        setSelectedTea();
        setSearchedTeas([]);
        clearInterval(currentInterval);
    }

    const token = localStorage.getItem('accessToken');

    return (
        <>
            {token && (
                <>
                    <div className='BrewTimerButton'>
                        <img src={Watch} alt="Watch" onClick={togglePopUp} />
                    </div>
                    <div className="BrewTimer" style={{ display: 'none' }}>
                        {!selectedTea && (
                            <>
                                <h1>Brew Timer</h1>
                                <div className="Searchbar">
                                    <div className="Close">
                                        <img src={Close} alt="Close" onClick={togglePopUp} />
                                    </div>
                                    <div className="Search">
                                        <label htmlFor="search">Search your tea:</label>
                                        <input type="text" name='search' placeholder='Type here' onChange={(e) => { searchTea(e.target.value) }} />
                                        <img src={Leaves} alt="Leaves" />
                                    </div>
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
                                        <img src={Back} alt="Back" onClick={back} />
                                    </div>
                                    <div className="Close">
                                        <img src={Close} alt="Close" onClick={togglePopUp} />
                                    </div>
                                    <div className="TeaTimer">
                                        <div className="TimerInformation">
                                            <h1 className="Timer">{renderTimer(selectedTea.brewTime)}</h1>
                                            <span>@ {selectedTea.temperature}</span>
                                        </div>
                                        <button type="submit" name='button' onClick={toggleTimer}>Start</button>
                                        <h4 className="Hint">{funfact}</h4>
                                    </div>
                                </div>
                            </>

                        )}
                    </div>
                </>
            )}
        </>
    )
}

export default BrewTimer