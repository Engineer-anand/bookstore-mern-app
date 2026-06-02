# 📚 Book Store MERN Application

A full-stack Book Store web application built using the MERN stack (MongoDB, Express.js, React.js, and Node.js). The application allows users to create accounts, securely log in, search for books, view book details, manage their profiles, and explore books using the Open Library API.

---

## 🚀 Features

### User Authentication

* User Registration (Signup)
* User Login
* Password Encryption using Bcrypt
* JWT-based Authentication
* Protected Routes
* User Profile Management

### Book Search

* Search books by title
* Fetch real-time book data from Open Library API
* View book details
* Access book covers and publication information

### User Experience

* Responsive User Interface
* Protected Dashboard Routes
* Toast Notifications
* React Router Navigation
* Persistent Login Sessions

---

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios
* Vite

### Backend

* Node.js
* Express.js
* JWT Authentication
* Bcrypt
* Joi Validation

### Database

* MongoDB
* Mongoose

### External APIs

* Open Library API

---

## 📂 Project Structure

```bash
Book_Store_MERN/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── db.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
└── README.md
```

---

# 🔐 Authentication Routes

## POST /auth/signup

Creates a new user account.

### Request Body

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Response

```json
{
  "message": "Signup successful",
  "success": true
}
```

---

## POST /auth/login

Authenticates a user and returns a JWT token.

### Request Body

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Response

```json
{
  "message": "Login successful",
  "jwttoken": "JWT_TOKEN"
}
```

---

# 👤 User Routes

## PUT /user/:email

Updates user profile information.

### Supported Fields

```json
{
  "name": "Updated Name",
  "email": "updated@example.com",
  "password": "newpassword"
}
```

### Features

* Email uniqueness validation
* Secure password hashing
* User data update

---

# 📚 Book Routes

## GET /books?title=book_name

Search books by title.

### Example

```http
GET /books?title=harry potter
```

### Returns

* Book Title
* Author Name
* Publication Year
* ISBN
* Cover Image
* Open Library Reference

---

## GET /books/:id

Fetch detailed information about a specific book.

### Example

```http
GET /books/OL82563W
```

### Returns

* Title
* Description
* Subjects
* Authors
* Cover Image

---

# 🔒 Security Features

* Password Hashing with Bcrypt
* JWT Authentication
* Input Validation using Joi
* Protected Routes
* Secure API Design

---

# 🖥️ Frontend Pages

| Route    | Description          |
| -------- | -------------------- |
| /        | Landing/Home Page    |
| /login   | User Login           |
| /signup  | User Registration    |
| /forgot  | Password Recovery UI |
| /profile | User Profile         |
| /contact | Contact Page         |
| /home    | Protected Dashboard  |

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/your-username/book-store-mern.git
```

---

## Backend Setup

```bash
cd backend

npm install

npm start
```

Server runs on:

```bash
http://localhost:8080
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# MongoDB Configuration

Make sure MongoDB is running locally.

Example connection:

```javascript
mongodb://localhost:27017/bookstore
```

---

# Future Improvements

* Wishlist Feature
* Book Reviews and Ratings
* Google Authentication
* Email Verification
* Admin Dashboard
* Pagination and Filters
* Dark Mode Support

---

# Learning Outcomes

This project helped strengthen knowledge of:

* MERN Stack Development
* REST API Design
* Authentication & Authorization
* MongoDB Data Modeling
* React Routing
* API Integration
* Full Stack Application Deployment

---

# Author

Anand Singh

B.Tech Computer Science Engineering

Passionate about Full Stack Development, MERN Stack, and AI-powered Applications.

---

## License

This project is created for educational and portfolio purposes.
