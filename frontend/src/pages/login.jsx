import React, { useState } from 'react';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Ensure Toastify styles are 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import BG from './component/models/bg'
import { API_BASE_URL } from '../config';
function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            return toast.error('All fields are required!');
        }

        try {
            const url = `${API_BASE_URL}/login`;

            const res = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const result = await res.json();

            if (res.ok && result?.jwttoken) {
                localStorage.setItem("Token", result.jwttoken);
                localStorage.setItem("Name", result.name);
                localStorage.setItem("Email", result.email);

                toast.success('Login successful!');
                setTimeout(() => {
                    navigate('/home');
                }, 1000);
            } else {
                toast.error(result.message || "Invalid login credentials.");
            }
        } catch (error) {
            console.error('Error during login:', error);
            toast.error('Something went wrong. Please try again later.');
        }
    };

    return (
        <div>
           <BG/>
            <div className="wrapper">
                <img src="img.png" alt="Logo" />
                <h2 className="text-rights">Welcome</h2>
                <div className="form-wrapper login">
                    <form onSubmit={handleSubmit}>
                        <h2>Login</h2>
                        <div className="input-box">
                            <span className="icon">
                                <FontAwesomeIcon icon={faEnvelope} />
                            </span>
                            <input
                                type="email"
                                placeholder="Enter Your Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoFocus
                                required
                            />
                        </div>
                        <div className="input-box">
                            <span className="icon">
                                <FontAwesomeIcon icon={faLock} />
                            </span>
                            <input
                                type="password"
                                placeholder="Enter Your Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="forgot-pass">
                            <span>
                                <Link to="/forgot">Forgot Password?</Link>
                            </span>
                        </div>
                        <button type="submit">Login</button>
                        <div className="sign-link">
                            <span>
                                Don't have an account? <Link to="/signup">Signup</Link>
                            </span>
                        </div>
                    </form>
                </div>
            </div>

            <ToastContainer />
        </div>
    );
}

export default Login;
