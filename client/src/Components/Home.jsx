import Navbar from "./Navbar"
import Journey from "./Journey"
import Explore from "./Explore"
import BrewTimer from "./BrewTimer/BrewTimer"
import Loading from "./Information/Loading"
import { useAuth } from "../Utils/auth"

const Home = () => {
    const { userInfo } = useAuth();

    return (
        <>
            {userInfo ? (
                <>
                    <nav>
                        <Navbar />
                    </nav>
                    <div className="Home">
                        <Journey />
                        <Explore />
                        <BrewTimer />
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