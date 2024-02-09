import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import BooksList from './Books';
import Register from './Regiistration';
import './App.css';

const App = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    fetch('https://reactnd-books-api.udacity.com/books', {
      headers: { 'Authorization': 'react-api-books' }
    })
      .then(response => response.json())
      .then(data => {
        setBooks(data.books);
        setFilteredBooks(data.books);
      })
      .catch(error => console.error('Error fetching books:', error));
  }, []);

  const handleSearch = (searchText) => {
    const filtered = books.filter(book => book.title.toLowerCase().includes(searchText.toLowerCase()));
    setFilteredBooks(filtered);
  };

  const handleSuccessfulRegistration = () => {
    window.location.href = '/';
  };

  return (
    <Router>
      <div>
      <header>
        <h1>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Kalvium Books</Link>
        </h1>
        <div className="search-bar">
          <input
           type="text"
          placeholder="Search Books"
          onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <nav>
          <Link to="/register" className="register-button">Register</Link>
        </nav>
      </header>

        <Routes>
          <Route
            path="/"
            element={<Home books={filteredBooks} />}
          />
          <Route
            path="/register"
            element={<Register onSuccessfulRegistration={handleSuccessfulRegistration} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

const Home = ({ books }) => {
  return (
    <div className="books-container">
      <BooksList books={books} />
    </div>
  );
};

export default App;