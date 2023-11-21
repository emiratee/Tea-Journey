import '../Styles/Journey.css';
import Destination from '../Assets/destination.png';
import TestBadge from '../Assets/medal.png';
import Badge from './Information/Badge';
import Information from './Information/Information';
import { useEffect } from 'react';
import LoginAlert from './Login/LoginAlert';
import moment from 'moment';
import { useAuth } from '../Utils/auth';
import React from 'react';
import { BadgeInterface } from '../../../interfaces/User';

const Journey: React.FC = () => {
  const { authenticated, userInfo, setUserInfo } = useAuth();

  useEffect(() => {
    console.log(userInfo);
    if (!authenticated) {
      const journeyElement = document.querySelector('.Journey');
      if (journeyElement) {
        journeyElement.classList.add('JourneyBlurred');
      }
    }
  }, [authenticated]);

  const {
    name,
    favourite_tea,
    brewing_time,
    brewed_teas,
    teas_drunken,
    badges,
    reviews,
    average_rating,
    joined_at,
  } = userInfo;

  console.log('Badges:', badges);

  return (
    <div className="Frame-Journey">
      {!authenticated && <LoginAlert />}
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
            <Information
              text={`${(brewing_time / 60).toFixed(0)} minutes`}
              className={''}
            />
          </div>
          <div className="Information-Item">
            <h3>Most brewed Tea:</h3>
            <Information
              text={
                Array.isArray(brewed_teas) && brewed_teas.length > 0
                  ? `${
                      brewed_teas.reduce(
                        (max, obj) => (obj.score > max.score ? obj : max),
                        brewed_teas[0]
                      ).name
                    } (${
                      brewed_teas.reduce(
                        (max, obj) => (obj.score > max.score ? obj : max),
                        brewed_teas[0]
                      ).score
                    })`
                  : 'None'
              }
              className={''}
            />
          </div>
          <div className="Information-Item">
            <h3>Teas drunken:</h3>
            <Information
              text={String(teas_drunken)}
              arrows={true}
              userInfo={userInfo}
              setUserInfo={setUserInfo}
              className={''}
            />
          </div>
          <div className="Information-Item">
            <h3>Badges:</h3>
            <div className="Badges-List">
              {typeof badges === 'object' &&
                badges
                  .filter((badge: BadgeInterface) => badge.unlocked)
                  .map((badge: BadgeInterface, index: number) => {
                    return (
                      <Badge key={index} img={TestBadge} text={badge.name} />
                    );
                  })}
              {/* fix every child should have unique key prop */}
            </div>
          </div>
          <div className="Information-Item">
            <h3>Total ratings:</h3>
            <Information text={`${reviews?.length || 0}/42`} className={''} />
          </div>

          <div className="Information-Item">
            <h3>Average rating:</h3>
            <Information
              text={average_rating ? average_rating.toFixed(2) : '0.00'}
              className={''}
            />
          </div>

          <div className="Information-Item">
            <h3>Best rated tea:</h3>
            <Information
              text={
                Array.isArray(reviews) && reviews.length > 0
                  ? reviews.reduce(
                      (max, obj) => (obj.score > max.score ? obj : max),
                      reviews[0]
                    ).name
                  : 'None'
              }
              className={''}
            />
          </div>
          <div className="Information-Item">
            <h3>Super useful tip:</h3>
            <Information text={'Boil water before making tea'} className={''} />
          </div>
          <div className="Information-Item">
            <h3>Joined at:</h3>
            <Information
              text={moment(joined_at).format('Do MMM[,] YYYY')}
              className={''}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Journey;
