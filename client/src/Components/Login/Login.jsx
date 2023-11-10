import '../../Styles/Login.css';
import { useNavigate } from 'react-router-dom';
import { validatePassword } from '../../apiService';

const Login = ({ setIsAuthenticated }) => {
    let navigate = useNavigate()
    async function login(e) {
        e.preventDefault()
        const isValid = await validatePassword(e.currentTarget.username.value, e.currentTarget.password.value);
        console.log(isValid);
        
        setIsAuthenticated(isValid)
        navigate('/dashboard');
    }

    return (
        <div className="Login">
            <form className="Login-Form" onSubmit={login}>
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
                    <button type='Submit'>Login</button>
                    <span>or register</span>
                </div>
            </form>
        </div>
    )
}

export default Login