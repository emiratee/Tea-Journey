import '../Styles/Navbar.css';
import Logo from '../Assets/green-tea.png';
import Account from '../Assets/account.png'
import auth from '../Utils/auth';
import { useNavigate } from 'react-router-dom';


const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  let navigate = useNavigate()

  function authenticate() {
    navigate('/login')
    // setIsAuthenticated(true)
    // auth.login(() => {
    //   document.querySelector('.Journey').classList.remove('JourneyBlurred');
    //   document.querySelector('.Explore').classList.remove('ExploreBlurred');
    // })
  }

  return (
    <div className='Navbar'>
      <div className="Name">
        <img src={Logo} alt="TeaJourney Logo" />
        <h1>TeaJourney</h1>
      </div>
      <div className="Account">
        {!isAuthenticated && (
          <>
            <button onClick={authenticate}>Login</button>
          </>
        )}
        {isAuthenticated && (
          <>
            <img src={Account} alt="Account" />
          </>
        )}
      </div>
    </div>
  )
}

export default Navbar
