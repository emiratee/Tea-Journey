import React, { useState, useEffect } from 'react';
import { Tea } from '../../../../interfaces/Tea';
import {
  addBrewedTea,
  addTeaTime,
  getAllFunfacts,
  getAllTeas,
} from '../../apiService';
import { useAuth } from '../../Utils/auth';
import BrewTimerSearchbar from './BrewTimerSearchbar';
import Back from '../../Assets/back.png';
import Close from '../../Assets/close.png';
import Leaves from '../../Assets/green-tea-leaves.png';
import Watch from '../../Assets/watch.png';
import '../../Styles/BrewTimer.css';
import { Funfact } from '../../../../interfaces/Funfact';

const BrewTimer: React.FC = () => {
  const { authenticated, setUserInfo, token } = useAuth();
  const [teas, setTeas] = useState<Tea[]>([]);
  const [searchedTeas, setSearchedTeas] = useState<Tea[]>([]);
  const [funfacts, setFunfacts] = useState<Funfact[]>([]);
  const [selectedTea, setSelectedTea] = useState<Tea | undefined>(undefined);
  const [currentInterval, setCurrentInterval] = useState<
    NodeJS.Timeout | undefined
  >(undefined);
  const [countSeconds, setCountSeconds] = useState<number>(0);
  const [timerDisplay, setTimerDisplay] = useState<string>('none');
  const [randomFunfact, setRandomFunfact] = useState<string>(
    'Tea enthusiasts: Water whisperers and herbal sorcerers.'
  );

  useEffect(() => {
    (async () => {
      const data = await getAllFunfacts();
      setFunfacts(data);
    })();
    (async () => {
      const data = await getAllTeas();
      setTeas(data);
    })();
    if (selectedTea && token !== null) {
      addBrewedTea(selectedTea, token);
      setUserInfo((prev) => {
        const updatedBrewedTeas = Array.isArray(prev.brewed_teas)
          ? prev.brewed_teas.map((tea) =>
              tea.name === selectedTea.name
                ? { ...tea, score: tea.score + 1 }
                : tea
            )
          : [{ ...selectedTea, score: 1 }];

        return {
          ...prev,
          brewed_teas: updatedBrewedTeas,
        };
      });
    }
  }, [setFunfacts, selectedTea, setUserInfo, token, setTeas]);

  useEffect(() => {
    if (authenticated) {
      function getRandomFunfact() {
        const randomIndex = Math.floor(Math.random() * funfacts.length);
        return funfacts[randomIndex].fact;
      }

      const intervalId = setInterval(() => {
        const fact = getRandomFunfact();
        setRandomFunfact(fact);
      }, 10000);

      return () => clearInterval(intervalId);
    }
  }, [funfacts, authenticated]);

  function togglePopUp() {
    setTimerDisplay((prev) => (prev === 'none' ? 'flex' : 'none'));
  }

  function searchTea(name: string) {
    if (name === '') return setSearchedTeas([]);
    const filteredTeas = teas
      .filter((tea) => tea.name.includes(name))
      .slice(0, 4);
    setSearchedTeas(filteredTeas);
  }

  function renderTimer(time: string) {
    const seconds = parseInt(time) * 60;
    const minutesDisplay = Math.floor(seconds / 60);
    const secondsDisplay = seconds % 60;
    return `${minutesDisplay}:${
      secondsDisplay < 10 ? '0' : ''
    }${secondsDisplay}`;
  }

  function toggleTimer(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    let seconds = parseInt(selectedTea?.brewTime || '0') * 60;
    seconds--;

    if (e.currentTarget.innerText === 'Reset') {
      if (token !== null) {
        addTeaTime(
          parseInt(selectedTea?.brewTime || '0') * 60 - countSeconds!,
          token
        );
        setUserInfo((prev) => ({
          ...prev,
          brewing_time:
            prev.brewing_time +
            (parseInt(selectedTea?.brewTime || '0') * 60 - countSeconds!),
        }));
        clearInterval(currentInterval);
        e.currentTarget.innerText = 'Start';
        seconds = parseInt(selectedTea?.brewTime || '0') * 60;
        const timerElement = document.querySelector('.Timer');
        if (timerElement) {
          timerElement.innerHTML = renderTimer(
            selectedTea?.brewTime.toString() || '0'
          );
        }
      } else {
        return <div>Error: Authentication token is missing.</div>;
      }
      return;
    }

    const interval = setInterval(() => {
      if (seconds === 0) {
        if (token !== null) {
          addTeaTime(parseInt(selectedTea?.brewTime || '0') * 60, token);
          setUserInfo((prev) => ({
            ...prev,
            brewing_time:
              prev.brewing_time + parseInt(selectedTea?.brewTime || '0') * 60,
          }));
          clearInterval(interval);
          const timerElement = document.querySelector('.Timer');
          if (timerElement) {
            timerElement.innerHTML = '0:00';
          }
        } else {
          return <div>Error: Authentication token is missing.</div>;
          clearInterval(interval);
        }
      } else {
        const minutesDisplay = Math.floor(seconds / 60);
        const secondsDisplay = seconds % 60;
        const timerElement = document.querySelector('.Timer');
        if (timerElement) {
          timerElement.innerHTML = `${minutesDisplay}:${
            secondsDisplay < 10 ? '0' : ''
          }${secondsDisplay}`;
        }
        seconds--;
        setCountSeconds(seconds);
      }
    }, 1000);

    setCurrentInterval(interval);
    e.currentTarget.innerText = 'Reset';
  }

  function back() {
    setSelectedTea(undefined);
    setSearchedTeas([]);
    if (currentInterval) {
      clearInterval(currentInterval);
    }
  }

  return (
    <>
      {token && (
        <>
          <div className="BrewTimerButton">
            <img src={Watch} alt="Watch" onClick={togglePopUp} />
          </div>
          <div className="BrewTimer" style={{ display: timerDisplay }}>
            {!selectedTea && (
              <>
                <h1>Brew Timer</h1>
                <div className="Searchbar">
                  <div className="Close">
                    <img src={Close} alt="Close" onClick={togglePopUp} />
                  </div>
                  <div className="Search">
                    <label htmlFor="search">Search your tea:</label>
                    <input
                      type="text"
                      name="search"
                      placeholder="Type here"
                      onChange={(e) => {
                        searchTea(e.target.value);
                      }}
                    />
                    <img src={Leaves} alt="Leaves" />
                  </div>
                  {searchedTeas.length > 0 && (
                    <div className="SearchedTeas">
                      {searchedTeas.map((tea) => {
                        return (
                          <BrewTimerSearchbar
                            key={tea.name}
                            tea={tea}
                            setSelectedTea={setSelectedTea}
                          />
                        );
                      })}
                    </div>
                  )}
                </div>
              </>
            )}
            {selectedTea && (
              <>
                <div className="BrewTimerPage">
                  <h1>Brew Timer</h1>
                  <div className="Back">
                    <img src={Back} alt="Back" onClick={back} />
                  </div>
                  <div className="Close">
                    <img src={Close} alt="Close" onClick={togglePopUp} />
                  </div>
                  <div className="TeaTimer">
                    <div className="TimerInformation">
                      <span>{selectedTea.name}</span>
                      <h1 className="Timer">
                        {renderTimer(selectedTea.brewTime)}
                      </h1>
                      <span>@ {selectedTea.temperature}</span>
                    </div>
                    <button
                      type="submit"
                      name="button"
                      onClick={(e) => toggleTimer(e)}
                    >
                      Start
                    </button>
                    <h4 className="Hint">{randomFunfact}</h4>
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default BrewTimer;
