import '../Styles/Navbar.css';
import Logo from '../Assets/green-tea.png';
import Settings from '../Assets/settings.png'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Profile from './Profile/Profile';


const Navbar = ({ isAuthenticated, setIsAuthenticated, userInfo, setUserInfo }) => {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  let navigate = useNavigate()

  function authenticate() {
    navigate('/login')
  }

  function openProfile() {
    setIsProfileModalOpen(true)
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
            <img src={Settings} alt="Account" onClick={openProfile} />
          </>
        )}
        {isProfileModalOpen && (
          <Profile setIsProfileModalOpen={setIsProfileModalOpen} userInfo={userInfo} setUserInfo={setUserInfo} />
        )}
      </div>
    </div>
  )
}

export default Navbar
