import { useAuth } from '../Utils/auth';
import Navbar from './Navbar';
import Journey from './Journey';
import Explore from './Explore';
import BrewTimer from './BrewTimer/BrewTimer';
import Loading from './Information/Loading';
import React from 'react';

const Home = () => {
  const { userInfo } = useAuth();

  return (
    <>
      {userInfo ? (
        <>
          <Navbar />
          <div className="Home">
            <Journey />
            <Explore />
            <BrewTimer />
          </div>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Home;
