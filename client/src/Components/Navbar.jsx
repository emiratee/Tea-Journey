import '../Styles/Navbar.css';
import Logo from '../Assets/green-tea.png';
import Account from '../Assets/account.png'
import auth from '../Utils/auth';
import { useNavigate } from 'react-router-dom';


const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  let navigate = useNavigate()

  function authenticate() {
    navigate('/login')
  }

  function goToProfile() {
    auth.logout();
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
            <img src={Account} alt="Account" onClick={goToProfile} />
          </>
        )}
      </div>
    </div>
  )
}

export default Navbar
