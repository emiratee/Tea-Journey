import '../Styles/Navbar.css';
import Logo from '../Assets/green-tea.png';
import Settings from '../Assets/settings.png'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Profile from './Profile/Profile';
import { useAuth } from '../Utils/auth';


const Navbar = ({ userInfo, setUserInfo }) => {
  const { authenticated } = useAuth();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  let navigate = useNavigate();

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
        {!authenticated && (
          <>
            <button onClick={authenticate}>Login</button>
          </>
        )}
        {authenticated && (
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
