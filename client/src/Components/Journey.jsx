import '../Styles/Journey.css';
import Destination from '../Assets/destination.png';
import TestBadge from '../Assets/medal.png';
import Badge from './Information/Badge';
import Information from './Information/Information';
import { useEffect } from 'react';
import LoginAlert from './Login/LoginAlert';

const Journey = ({ isAuthenticated, userInfo }) => {
  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (!token) {
      document.querySelector('.Journey').classList.add('JourneyBlurred');
    }
  }, [isAuthenticated]);

  const { username, favourite_tea, brewing_time, brewed_teas, teas_drunken, badges, day_streak, reviews, average_rating } = userInfo ?? {
    username: 'Test',
    favourite_tea: 'None',
    brewing_time: 0,
    brewed_teas: [],
    teas_drunken: 0,
    badges: [],
    day_streak: 0,
    reviews: [],
    average_rating: 0
  };
  let Username = username.charAt(0).toUpperCase() + username.slice(1);


  return (
    <div className="Frame-Journey">
      {!isAuthenticated && (
        <>
          <LoginAlert />
        </>
      )}
      <div className="Journey">
        <div className="Title">
          <h1>{Username}'s Journey</h1>
          <img src={Destination} alt="Destination" />
        </div>
        <div className="Information">
          <div className="Information-Item">
            <h3>Favourite Tea:</h3>
            <Information text={favourite_tea} />
          </div>
          <div className="Information-Item">
            <h3>Total brewing Time:</h3>
            <Information text={`${brewing_time} minutes`} />
          </div>
          <div className="Information-Item">
            <h3>Most brewed Tea:</h3>
            <Information text='TBA' />
          </div>
          <div className="Information-Item">
            <h3>Teas drunken:</h3>
            <Information text={teas_drunken} />
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
            <Information text={day_streak} />
          </div>
          <div className="Information-Item">
            <h3>Reviews:</h3>
            <Information text={`${reviews.length}/42`} />
          </div>
          <div className="Information-Item">
            <h3>Average review rating:</h3>
            <Information text={average_rating} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Journey;
