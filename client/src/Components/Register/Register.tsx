import '../../Styles/Register.css';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../apiService';
import { useAuth } from '../../Utils/auth';
import React, { FormEvent } from 'react';

const Register = () => {
  const { login, setToken } = useAuth();
  let navigate = useNavigate();

  async function register(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    const response = await registerUser(name, username, password);

    if (response.status === 201) {
      localStorage.setItem('accessToken', response.token);
      setToken(response.token);
      login();
      navigate('/dashboard');
    } else {
      e.currentTarget.reset();
      alert(response.message);
    }
  }

  return (
    <div className="Register">
      <form className="Register-Form" onSubmit={register}>
        <h1>Register</h1>
        <div className="Name">
          <label htmlFor="name">Name:</label>
          <input type="text" name="name" required={true} />
        </div>
        <br />
        <div className="Username">
          <label htmlFor="username">Username:</label>
          <input type="text" name="username" required={true} />
        </div>
        <br />
        <div className="Password">
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" required={true} />
        </div>
        <div className="Validate">
          <button type="submit">Register</button>
          <span
            onClick={() => {
              navigate('/login');
            }}
          >
            or login
          </span>
        </div>
      </form>
    </div>
  );
};

export default Register;
