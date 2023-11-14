import '../../Styles/Login.css';
import { useNavigate } from 'react-router-dom';
import { validatePassword } from '../../apiService';
import { useAuth } from '../../Utils/auth';

const Login = () => {
    const { login, setToken } = useAuth();
    const navigate = useNavigate();
    
    async function handleLogin(e) {
        e.preventDefault();
        const response = await validatePassword(e.currentTarget.username.value, e.currentTarget.password.value);

        if(response.status === 200) {
            localStorage.setItem('accessToken', response.token)
            setToken(response.token);
            login();
            navigate('/dashboard');
        } else {
            e.target.username.value = '';
            e.target.password.value = '';
            alert(response.message);
        }
    }

    function register() {
        navigate('/register')
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
                    <button type='Submit'>Login</button>
                    <span onClick={register}>or register</span>
                </div>
            </form>
        </div>
    )
}

export default Login