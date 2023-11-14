import Navbar from "./Navbar"
import Journey from "./Journey"
import Explore from "./Explore"
import BrewTimer from "./BrewTimer/BrewTimer"
import { useEffect, useState } from "react"
import Loading from "./Information/Loading"
import { useAuth } from "../Utils/auth"

const Home = ({ userInfo }) => {
    const { authenticated } = useAuth()
    const [currentUserInfo, setCurrentUserInfo] = useState();
    useEffect(() => {
        if (!authenticated) {
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
    }, [userInfo, authenticated]);


    return (
        <>
            {currentUserInfo ? (
                <>
                    <nav>
                        <Navbar userInfo={currentUserInfo} setUserInfo={setCurrentUserInfo} />
                    </nav>
                    <div className="Home">
                        <Journey userInfo={currentUserInfo} setUserInfo={setCurrentUserInfo} />
                        <Explore userInfo={currentUserInfo} setUserInfo={setCurrentUserInfo} />
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