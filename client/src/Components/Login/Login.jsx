import '../../Styles/Login.css';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsAuthenticated }) => {
    let navigate = useNavigate()
    function login() {
        setIsAuthenticated(true)
        navigate('/dashboard');
    }

    return (
        <div className="Login">
            <div className="Login-Form">
                <h1>Login</h1>
                <div className="Username">
                    <label htmlFor="username">Username:</label>
                    <input type="text" name="username" />
                </div>
                <br />
                <div className="Password">
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" />
                </div>
                <div className="Validate">
                    <button onClick={login}>Login</button>
                    <span>or register</span>
                </div>
            </div>
        </div>
    )
}

export default Login