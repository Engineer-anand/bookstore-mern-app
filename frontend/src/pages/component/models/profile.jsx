import React, { useState, useEffect } from 'react';
import './profile.css';
import DropDown from './../Dropdown';
import BackButton from './BackButton'; // Import BackButton component
import { toast } from 'react-toastify';
import BG from './bg';
import { API_BASE_URL } from '../../../config';

function Profile() {
    const [user, setUser] = useState({
        name: '',
        email: '',
        profilePicture: 'https://api.dicebear.com/9.x/lorelei/svg?hair=variant01,variant02,variant45' || 'https://api.dicebear.com/9.x/lorelei/svg?mouth=happy01,happy02,happy17', // Default placeholder
    });

    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const userData = {
            name: localStorage.getItem('Name') || 'User Name',
            email: localStorage.getItem('Email') || 'user@example.com',
            profilePicture: 'https://api.dicebear.com/9.x/lorelei/svg?mouth=happy01,happy02,happy03' || "https://api.dicebear.com/9.x/lorelei/svg?hair=variant01,variant02,variant03",
        };
        setUser(userData);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
    };

    const saveChanges = async () => {
        if (!user.name || !user.email) {
            toast.info('Name and Email are required.');
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/update/${user.email}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('Token')}`,
                },
                body: JSON.stringify(user),
            });

            if (response.ok) {
                toast.success('Profile updated successfully!');
                localStorage.setItem('Name', user.name);
                localStorage.setItem('Email', user.email);
                localStorage.setItem('ProfilePicture', user.profilePicture);
                setIsEditing(false);
            } else {
                const result = await response.json();
                toast.error(result.message || 'Failed to update profile. Please try again.');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('An error occurred. Please try again later.');
        }
    };

    return (
        <>
          <BG/>
            <div className="profile-container">
                <div className="profile-header">
                    <img
                        src={user.profilePicture}
                        alt="Profile"
                        className="profile-picture"
                    />
                    {isEditing && (
                        <input
                            type="text"
                            name="profilePicture"
                            value={user.profilePicture}
                            onChange={handleChange}
                            placeholder="Enter profile picture URL"
                        />
                    )}
                    <h2>
                        {isEditing ? (
                            <input
                                type="text"
                                name="name"
                                value={user.name}
                                onChange={handleChange}
                                placeholder="Enter your name"
                            />
                        ) : (
                            user.name
                        )}
                    </h2>
                    <p>
                        {isEditing ? (
                            <input
                                type="email"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                            />
                        ) : (
                            user.email
                        )}
                    </p>
                    {isEditing ? (
                        <>
                            <button className="save-btn" onClick={saveChanges}>
                                Save Changes
                            </button>
                            <button className="cancel-btn" onClick={() => setIsEditing(false)}>
                                Cancel
                            </button>
                        </>
                    ) : (
                        <button className="edit-btn" onClick={() => setIsEditing(true)}>
                            Edit Profile
                        </button>
                    )}
                </div>

                <div className="profile-content"></div>
            </div>
            <DropDown />
            <BackButton /> {/* Use BackButton component here */}
        </>
    );
}

export default Profile;
