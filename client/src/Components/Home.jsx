import Navbar from "./Navbar"
import Journey from "./Journey"
import Explore from "./Explore"
import BrewTimer from "./BrewTimer/BrewTimer"

const Home = ({ isAuthenticated, setIsAuthenticated, userInfo }) => {
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