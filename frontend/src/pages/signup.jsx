import React, { useState } from 'react';
import './signup.css';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import './../toastUtils';
import { handleError } from './../toastUtils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import BG from './component/models/bg'
import { API_BASE_URL } from '../config';


function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            return toast.error('All fields are required');
        }

        try {
            const url = `${API_BASE_URL}/signup`;
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            const result = await res.json();

            if (res.ok) {

                toast.success('Signup Successful, Now You Can Login');
                setTimeout(() => {
                    navigate('/login');
                }, 1000);
            } else {
                toast.error(result.message || 'Signup failed');
            }
        } catch (error) {
            console.error('Error during signup:', error);
            handleError('Something went wrong!');
        }
    };

    return (
        <div>
           <BG/>
            <div className="wrapper">
                <h2 className="text-right">Welcome</h2>
                <div className="form-wrapper signup">
                    <form onSubmit={handleSubmit}>
                        <h2>Signup</h2>

                        <div className="input-box">
                            <span className="icon">
                                <FontAwesomeIcon icon={faUser} />
                            </span>
                            <input
                                onChange={(e) => setName(e.target.value)}
                                name="name"
                                type="text"
                                placeholder="Enter Your Name"
                                required
                                autoFocus
                            />
                        </div>
                        <div className="input-box">
                            <span className="icon">
                                <FontAwesomeIcon icon={faEnvelope} />
                            </span>
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                name="email"
                                type="email"
                                placeholder="Enter Your Email"
                                required
                            />
                        </div>
                        <div className="input-box">
                            <span className="icon">
                                <FontAwesomeIcon icon={faLock} />
                            </span>
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                name="password"
                                type="password"
                                placeholder="Enter Your Password"
                                required
                            />
                        </div>
                        <button type="submit">Signup</button>
                        <div className="sign-link">
                            <span>Already have an account? <Link to="/Login">Login</Link></span>
                        </div>
                    </form>
                </div>
            </div>

            <ToastContainer />
        </div>
    );
}

export default Signup;
