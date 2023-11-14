import '../Styles/Journey.css';
import Destination from '../Assets/destination.png';
import TestBadge from '../Assets/medal.png';
import Badge from './Information/Badge';
import Information from './Information/Information';
import { useState, useEffect } from 'react';
import LoginAlert from './Login/LoginAlert';
import * as moment from 'moment';

const Journey = ({ isAuthenticated, userInfo, setUserInfo }) => {
  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (!token) {
      document.querySelector('.Journey').classList.add('JourneyBlurred');
    }
  }, [isAuthenticated]);


  const { name, username, favourite_tea, brewing_time, brewed_teas, teas_drunken, badges, reviews, average_rating, joined_at } = userInfo ?? {
    name: 'Test',
    username: 'Test',
    favourite_tea: 'None',
    brewing_time: 0,
    brewed_teas: 'None',
    teas_drunken: 0,
    badges: [{
      name: 'Placeholder',
      unlocked: true
    }],
    reviews: 'None',
    average_rating: 0,
    joined_at: 'Now'
  };

  return (
    <div className="Frame-Journey">
      {!isAuthenticated && (
        <LoginAlert />
      )}
      <div className="Journey">
        <div className="Title">
          <h1>{name}'s Journey</h1>
          <img src={Destination} alt="Destination" />
        </div>
        <div className="Information">
          <div className="Information-Item">
            <h3>Favourite Tea:</h3>
            <Information className={'FavouriteTea'} text={favourite_tea} />
          </div>
          <div className="Information-Item">
            <h3>Total brewing Time:</h3>
            <Information text={`${(brewing_time / 60).toFixed(0)} minutes`} />
          </div>
          <div className="Information-Item">
            <h3>Most brewed Tea:</h3>
            <Information text={
              Array.isArray(brewed_teas) && brewed_teas.length > 0
                ? `${brewed_teas.reduce((max, obj) => (obj.score > max.score ? obj : max), brewed_teas[0]).name} (${brewed_teas.reduce((max, obj) => (obj.score > max.score ? obj : max), brewed_teas[0]).score})`
                : 'None'
            } />
          </div>
          <div className="Information-Item">
            <h3>Teas drunken:</h3>
            <Information text={teas_drunken} arrows={true} userInfo={userInfo} setUserInfo={setUserInfo} />
          </div>
          <div className="Information-Item">
            <h3>Badges:</h3>
            <div className="Badges-List">
              {typeof badges === 'object' && badges.filter(badge => badge.unlocked).map(badge => { return <Badge img={TestBadge} text={badge.name} /> })}
            </div>
          </div>
          <div className="Information-Item">
            <h3>Total ratings:</h3>
            <Information text={`${reviews.length}/42`} />
          </div>
          <div className="Information-Item">
            <h3>Average rating:</h3>
            <Information text={average_rating.toFixed(2)} />
          </div>
          <div className="Information-Item">
            <h3>Best rated tea:</h3>
            <Information text={userInfo.reviews.reduce((max, obj) => (obj.score > max.score ? obj : max), userInfo.reviews[0]).name} />
          </div>
          <div className="Information-Item">
            <h3>Placeholder</h3>
            <Information text={'Placeholder'} />
          </div>
          <div className="Information-Item">
            <h3>Joined at:</h3>
            <Information text={moment(joined_at).format('Do MMM[,] YYYY')} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Journey;
