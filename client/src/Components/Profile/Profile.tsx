import '../../Styles/Profile.css';
import Modal from 'react-modal';
import { useAuth } from '../../Utils/auth';
import Close from '../../Assets/close.png';
import { useEffect, useState } from 'react';
import { resetJourney, updateUser } from '../../apiService';
import React from 'react';

interface ProfileProps {
  setIsProfileModalOpen: (isOpen: boolean) => void;
}

const ProfileStyle = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'linear-gradient(135deg, #6a994e, #386641)',
    borderRadius: '10px',
    color: '#fff',
    padding: '20px',
    border: 'none',
    height: 'calc(100vh - 40%)',
    width: 'calc(100vw - 65%)',
  },
};

const Profile: React.FC<ProfileProps> = ({ setIsProfileModalOpen }) => {
  const { logout, setUserInfo } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(true);

  useEffect(() => {
    if (isModalOpen) {
      const homeElement = document.querySelector('.Home');
      if (homeElement) {
        homeElement.classList.add('Blurred');
      }
    }
  });

  async function update(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newName = formData.get('name') as string;
    const newUsername = formData.get('username') as string;
    const newPassword = formData.get('password') as string;
    const token = localStorage.getItem('accessToken');

    if (token) {
      const response = await updateUser(
        newName,
        newUsername,
        newPassword,
        token
      );
      if (response.status === 200) {
        setUserInfo((prev) => ({
          ...prev,
          name: response.result.name,
          username: response.result.username,
          password: response.result.password,
        }));
        alert('Successfully updated user data!');
      } else {
        alert(response.message);
      }
    } else {
      console.error('No authentication token found');
    }
  }

  function close() {
    setIsModalOpen(false);
    setIsProfileModalOpen(false);
    const homeElement = document.querySelector('.Home');
    if (homeElement) {
      homeElement.classList.remove('Blurred');
    }
  }

  function reset() {
    const shouldReset = window.confirm(
      'Are you sure you want to reset your journey?'
    );

    if (shouldReset) {
      const token = localStorage.getItem('accessToken');
      if (token) {
        resetJourney(token);
        window.location.reload();
      } else {
        console.error('No authentication token found');
      }
    }
  }
  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={close}
      contentLabel="Profile Modal"
    >
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
              <input
                type="password"
                name="password"
                placeholder="New password"
              />
            </div>
            <br />
            <div className="Save">
              <button type="submit">Save changes</button>
            </div>
          </form>
        </div>
        <div className="End">
          <div className="Journey">
            <button onClick={reset}>Reset Journey</button>
          </div>
          <div className="Logout">
            <button onClick={() => logout()}>Log out</button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Profile;
