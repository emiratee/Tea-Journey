import '../../Styles/Register.css';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../apiService';
import { useAuth } from '../../Utils/auth';

const Register = () => {
    const { authenticated, login, setToken } = useAuth();
    let navigate = useNavigate()

    async function register(e) {
        e.preventDefault()
        const response = await registerUser(e.currentTarget.name.value, e.currentTarget.username.value, e.currentTarget.password.value);

        if (response.status === 201) {
            localStorage.setItem('accessToken', response.token);
            setToken(response.token);
            login()
            navigate('/dashboard');
        } else {
            e.target.name.value = '';
            e.target.username.value = '';
            e.target.password.value = '';
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
                    <button type='Submit'>Register</button>
                    <span onClick={() => { navigate('/login') }}>or login</span>
                </div>
            </form>
        </div>
    )
}

export default Register