import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import bgpng from "./images/bg-png.png";
import './home.css';
import Card from './component/card';
import axios from 'axios';
import DropDown from './component/Dropdown';
import BG from './component/models/bg';

function Home() {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [search, setSearch] = useState('');
  const [booksData, setBooksData] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const navigate = useNavigate();

  // Fetch logged-in user details from localStorage
  useEffect(() => {
    const userName = localStorage.getItem('Name');
    setLoggedInUser(userName);
  }, []);

  // Search books function
  const searchBooks = async (e) => {
    if (e.key === 'Enter') {
      try {
        if (!search.trim()) {
          toast.error('Please enter a search term!');
          return;
        }

        const apiKey = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;
        const requestUrl = apiKey
          ? `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(search)}&key=${apiKey}&maxResults=40`
          : `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(search)}&maxResults=40`;
        const response = await axios.get(requestUrl);
        setBooksData(response.data.items || []);
      } catch (error) {
        console.error('Error fetching books:', error);
        toast.error('Failed to fetch books. Try again later.');
      }
    }
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('Token');
    localStorage.removeItem('Name');
    setLoggedInUser('');
    toast.success('Logout successful');
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  // Toggle dropdown menu
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  useEffect(() => {
    // Remove 'display: flex' from the body
    document.body.style.display = 'block';
    return () => {
      document.body.style.display = '';
    };
  }, []);
  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <>
      <BG />

      <div className="header">
        <div className="row1">
          <h1>A room without books <br />is like a body without a soul...</h1>
        </div>
        <div className="row2">
          <h2>Find your books</h2>
          <div className="search">
            <input
              type="text"
              placeholder="Search your books"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyPress={searchBooks}
            />
          </div  >
          <img src={bgpng} alt="Background" />
        </div>
      </div>
      <DropDown />
      <div className="container">
        <Card search={search} books={booksData} />
      </div>
    </>
  );
}

export default Home;  