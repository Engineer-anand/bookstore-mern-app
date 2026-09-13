import React, { useState } from 'react';
import './forgot.css'; // Add relevant styles for this page
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { API_BASE_URL } from '../config';
import 'react-toastify/dist/ReactToastify.css';

function ForgotPassword() {
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            return toast.error('Email is required!');
        }

        try {
            const url = `${API_BASE_URL}/forgot-password`;

            const res = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const result = await res.json();

            if (res.ok) {
                toast.success(result.message || 'Password reset link sent!');
            } else {
                toast.error(result.message || 'Unable to process your request.');
            }
        } catch (error) {
            console.error('Error during forgot password request:', error);
            toast.error('Something went wrong. Please try again later.');
        }
    };

    return (
        <div>
            <div class="background">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div className="wraps">
                {/* <img src="img.png" alt="Logo" /> */}
                <div className="form-wrapper forgot">
                    <form onSubmit={handleSubmit}>
                        <h2>Reset Password</h2>
                        <div className="input-box">
                            <span className="icn">
                                <ion-icon name="mail"></ion-icon>
                            </span>
                            <input
                                type="email"
                                placeholder="Enter Your Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <button  type="submit">Send Reset Link</button>
                        <div className="back-link">
                            <span >
                                Remembered? <Link to="/login">Back to Login</Link>
                            </span>
                        </div>
                    </form>
                </div>
            </div>

            <ToastContainer />
        </div>
    );
}

export default ForgotPassword;
