import { useState } from "react";
import "./css/signup.css";
import { Link } from "react-router-dom";
import useApi from "./api";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [c_password, setC_Password] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const api = useApi();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== c_password) {
            return window.alert('Passwords are not similar...');
        }
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 2000));

        try {
            const response = await api.post(
                "userCreate",
                {
                    name,
                    email,
                    password
                }
            );
            const accessToken = response.data;
            localStorage.setItem('accessToken', accessToken);
            navigate('/items');
        } catch (error) {
            console.error(error);
            setC_Password('');
            setPassword('');
            setName('');
            setPassword('');
            setPassword('');
            localStorage.setItem('wrong password', error.data);
            setError(error.data);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="bodyC">

        <div className="bodys">
            <div className="signup-container">
                <h2 className="signup-sign">Signup</h2>
                <p className="error-message">{error}</p>
                <form onSubmit={handleSubmit} className="form-container" method="POST">
                    <label htmlFor="name" className="signup-label">Name:</label>
                    <input type="text" id="name" name="name" required value={name} onChange={(e) => setName(e.target.value)} className="signup-input" />

                    <label htmlFor="email" className="signup-label">Email:</label>
                    <input type="email" id="email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="signup-input" />

                    <label htmlFor="password" className="signup-label">Password:</label>
                    <input type="password" id="password" name="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="signup-input" />

                    <label htmlFor="R-password" className="signup-label">Confirm Password:</label>
                    <input type="password" id="R-password" required value={c_password} onChange={(e) => setC_Password(e.target.value)} className="signup-input" />

                    <button type="submit" className="signup-button" disabled={loading}>
                        {loading ? "Signing up..." : "Signup"}
                    </button>

                    <Link to="/login" className="signup-link">Already have an Account? Login</Link>
                    <div className="socialmedia">
                        <Link to="/login" className="login-socialmedia">Google</Link>
                        <Link to="/login" className="login-socialmedia">LinkedIn</Link>
                        <Link to="/login" className="login-socialmedia">Instagram</Link>
                    </div>
                </form>
            </div>
        </div>
        </div>
    );
}

export default Signup;
