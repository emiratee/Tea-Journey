import React from 'react';
import { useNavigate } from 'react-router-dom';
import { validatePassword } from '../../apiService';
import { useAuth } from '../../Utils/auth';
import '../../Styles/Login.css';

const Login: React.FC = () => {
  const { login, setToken } = useAuth();
  const navigate = useNavigate();

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const username = (
      e.currentTarget.elements.namedItem('username') as HTMLInputElement
    )?.value;
    const password = (
      e.currentTarget.elements.namedItem('password') as HTMLInputElement
    )?.value;

    if (username && password) {
      const response = await validatePassword(username, password);

      if (response.status === 200) {
        localStorage.setItem('accessToken', response.token);
        setToken(response.token);
        login();
        navigate('/dashboard');
      } else {
        (
          e.currentTarget.elements.namedItem('username') as HTMLInputElement
        ).value = '';
        (
          e.currentTarget.elements.namedItem('password') as HTMLInputElement
        ).value = '';
        alert(response.message);
      }
    }
  }

  function register() {
    navigate('/register');
  }

  return (
    <div className="Login">
      <form className="Login-Form" onSubmit={handleLogin}>
        <h1>Login</h1>
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
          <button type="submit">Login</button>
          <span onClick={register}>or register</span>
        </div>
      </form>
    </div>
  );
};

export default Login;
