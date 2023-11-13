import Navbar from "./Navbar"
import Journey from "./Journey"
import Explore from "./Explore"
import BrewTimer from "./BrewTimer/BrewTimer"
import auth from "../Utils/auth"
import { useEffect, useState } from "react"

const Home = ({ isAuthenticated, setIsAuthenticated, userInfo }) => {
  const [currentUserInfo, setCurrentUserInfo] = useState(userInfo);

    useEffect(() => {
        if (userInfo) {
          setCurrentUserInfo(userInfo)
        }
      }, [userInfo])
    return (
        <>
            <nav>
                <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} userInfo={userInfo} />
            </nav>
            <Journey isAuthenticated={isAuthenticated} userInfo={userInfo} />
            <Explore isAuthenticated={isAuthenticated} userInfo={userInfo} />
            <BrewTimer />
        </>
    )
}

export default Home