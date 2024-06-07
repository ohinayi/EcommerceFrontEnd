import { Link } from "react-router-dom";
import "./css/login.css";
import { useState, useContext } from "react";
import useApi from "./api";
import { useNavigate } from "react-router-dom";
import { authcontext } from "./context";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const api = useApi();
    const navigate = useNavigate();
    const { authenticate } = useContext(authcontext);

    const handleClick = async (event) => {
        event.preventDefault();
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        try {
            localStorage.removeItem('wrong password');
            const response = await api.post("userLogin", { email, password });
            const accessToken = await response.data;
            localStorage.setItem('accessToken', accessToken);
            authenticate();
            navigate('/items');
        } catch (error) {
            console.log(error);
            localStorage.setItem('wrong password', error.data);
            setError(error.data);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="bodyC">
            <div className="bodys">
                <div className="login-container">
                    <h2 className="login-sign">Login</h2>
                    <p className="error-message">{error}</p>
                    <form className="form-container" onSubmit={handleClick} method="POST">

                        <label htmlFor="email" className="login-label">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="login-input"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                        />

                        <label htmlFor="password" className="login-label">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="login-input"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                        />

                        <button className="login-button" type="submit" disabled={loading}>
                            {loading ? "Logging in..." : "Login"}
                        </button>

                        <Link to="/signup" className="login-link">Don't have an Account? Signup</Link>
                        <div className="socialmedia">
                            <Link to={"/login"} className="login-socialmedia">google</Link>
                            <Link to={"/login"} className="login-socialmedia">linkedin</Link>
                            <Link to={"/login"} className="login-socialmedia">instagram</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
