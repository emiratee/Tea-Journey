import Navbar from "./Navbar"
import Journey from "./Journey"
import Explore from "./Explore"
import BrewTimer from "./BrewTimer/BrewTimer"

const Home = ({ isAuthenticated, setIsAuthenticated }) => {
    return (
        <>
            <nav>
                <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
            </nav>
            <Journey isAuthenticated={isAuthenticated} />
            <Explore isAuthenticated={isAuthenticated} />
            <BrewTimer />
        </>
    )
}

export default Home