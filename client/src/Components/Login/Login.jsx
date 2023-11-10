import '../../Styles/Login.css';

const Login = () => {
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
                    <button>Login</button>
                    <span>or register</span>
                </div>
            </div>
        </div>
    )
}

export default Login