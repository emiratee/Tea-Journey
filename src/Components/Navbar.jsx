import Logo from '../Assets/logo.png';
import '../Styles/Navbar.css';

const Navbar = () => {
  return (
    <div className='Navbar'>
        <img src={Logo} alt="TeaJourney Logo" />
        <h1>TeaJourney</h1>
    </div>
  )
}

export default Navbar