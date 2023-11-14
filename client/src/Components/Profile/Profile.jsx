import '../../Styles/Profile.css'
import Modal from 'react-modal';
import auth from '../../Utils/auth';
import Close from '../../Assets/close.png';
import { useEffect, useState } from 'react';
import { resetJourney, updateUser } from '../../apiService';

const ProfileStyle = {
  overlay: {
    backgroundColor: 'transparent',
  },
  content: {
    position: 'fixed',
    background: 'linear-gradient(135deg, #6a994e, #386641)',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    borderRadius: '10px',
    color: '#fff',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    height: 'calc(100vh - 40%)',
    width: 'calc(100vw - 65%)'
  }
};

const Profile = ({ setIsProfileModalOpen, userInfo, setUserInfo }) => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  useEffect(() => {
    if (isModalOpen) document.querySelector('.Home').classList.add('Blurred');
  })

  async function update(e) {
    e.preventDefault();
    const newName = e.currentTarget.name.value;
    const newUsername = e.currentTarget.username.value;
    const newPassword = e.currentTarget.password.value;
    const token = localStorage.getItem('accessToken')
    const response = await updateUser(newName, newUsername, newPassword, token);
    if (response.status === 200) {
      setUserInfo((prev) => ({
        ...prev,
        name: response.result.name,
        username: response.result.username,
        password: response.result.password
      }));
      alert('Successfully updated user data!');
    } else {
      alert(response.message)
    }
  }

  function close() {
    setIsModalOpen(false);
    setIsProfileModalOpen(false);
    document.querySelector('.Home').classList.remove('Blurred');
  }

  function reset() {
    const shouldReset = window.confirm('Are you sure you want to reset your journey?');

    if (shouldReset) {
      const token = localStorage.getItem('accessToken')
      resetJourney(token);
      window.location.reload();
    }
  }

  function logout() {
    auth.logout()
  }

  return (
    <Modal style={ProfileStyle} isOpen={isModalOpen} >
      <div className="Profile">
        <div className="Top">
          <h1>Account settings</h1>
          <img src={Close} alt="Close" onClick={close} />
        </div>
        <div className="Main">
          <form className="Profile-Form" onSubmit={update}>
            <div className="Name">
              <label htmlFor="name">Name:</label>
              <input type="text" name="name" placeholder={'New name'} />
            </div>
            <br />
            <div className="Username">
              <label htmlFor="password">Username:</label>
              <input type="text" name="username" placeholder={'New username'} />
            </div>
            <br />
            <div className="Password">
              <label htmlFor="password">Password:</label>
              <input type="password" name="password" placeholder='New password' />
            </div>
            <br />
            <div className="Save">
              <button type='Submit'>Save changes</button>
            </div>
          </form>
        </div>
        <div className="End">
          <div className="Journey">
            <button onClick={reset}>Reset Journey</button>
          </div>
          <div className="Logout">
            <button onClick={logout}>Log out</button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default Profile