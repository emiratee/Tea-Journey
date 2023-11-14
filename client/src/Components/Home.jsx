import Navbar from "./Navbar"
import Journey from "./Journey"
import Explore from "./Explore"
import BrewTimer from "./BrewTimer/BrewTimer"
import { useEffect, useState } from "react"
import Loading from "./Information/Loading"

const Home = ({ isAuthenticated, setIsAuthenticated, userInfo }) => {
    const [currentUserInfo, setCurrentUserInfo] = useState();
    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            setCurrentUserInfo({
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
            });
        }
        if (userInfo) {
            setCurrentUserInfo(userInfo)
        }
    }, [userInfo]);

    return (
        <>
            {currentUserInfo ? (
                <>
                    <nav>
                        <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} userInfo={currentUserInfo} setUserInfo={setCurrentUserInfo} />
                    </nav>
                    <div className="Home">
                        <Journey isAuthenticated={isAuthenticated} userInfo={currentUserInfo} setUserInfo={setCurrentUserInfo} />
                        <Explore isAuthenticated={isAuthenticated} userInfo={currentUserInfo} setUserInfo={setCurrentUserInfo} />
                        <BrewTimer userInfo={currentUserInfo} setUserInfo={setCurrentUserInfo} />
                    </div>
                </>
            ) : (
                <>
                    <Loading />
                </>
            )}
        </>
    )
}

export default Home