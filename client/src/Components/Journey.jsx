import '../Styles/Journey.css';
import Destination from '../Assets/destination.png';
import TestBadge from '../Assets/medal.png';
import Badge from './Information/Badge';
import Information from './Information/Information';
import { useEffect } from 'react';
import LoginAlert from './Login/LoginAlert';

const Journey = ({ isAuthenticated }) => {
  useEffect(() => {
    if (!isAuthenticated) {
      document.querySelector('.Journey').classList.add('JourneyBlurred');
    }
  }, [isAuthenticated]);

  return (
    <div className="Frame-Journey">
      {!isAuthenticated && (
        <>
          <LoginAlert />
        </>
      )}
      <div className="Journey">
        <div className="Title">
          <h1>My Journey</h1>
          <img src={Destination} alt="Destination" />
        </div>
        <div className="Information">
          <div className="Information-Item">
            <h3>Favourite Tea:</h3>
            <Information text={'Earl Grey'} />
          </div>
          <div className="Information-Item">
            <h3>Brewing Time:</h3>
            <Information text={'48 minutes'} />
          </div>
          <div className="Information-Item">
            <h3>Most brewed Tea:</h3>
            <Information text={'Sosi Sosi'} />
          </div>
          <div className="Information-Item">
            <h3>Teas drunken:</h3>
            <Information text={'27'} />
          </div>
          <div className="Information-Item">
            <h3>Badges:</h3>
            <div className="Badges-List">
              <Badge img={TestBadge} text={'Tea Lover'} />
              <Badge img={TestBadge} text={'Tea Expert'} />
              <Badge img={TestBadge} text={'Tea Maker'} />
            </div>
          </div>
          <div className="Information-Item">
            <h3>Tea drinking day streak:</h3>
            <Information text={'6'} />
          </div>
          <div className="Information-Item">
            <h3>Reviews:</h3>
            <Information text={'7/35'} />
          </div>
          <div className="Information-Item">
            <h3>Average review rating:</h3>
            <Information text={'6.3'} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Journey;
