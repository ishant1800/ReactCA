import React from 'react';
import './App.css';

const truncateText = (text, maxWordsPerLine) => {
  const words = text.split(' ');
  const lines = [];
  for (let i = 0; i < words.length; i += maxWordsPerLine) {
    lines.push(words.slice(i, i + maxWordsPerLine).join(' '));
  }
  return lines.join('<br />');
};

const BooksList = ({ books }) => {
  return (
    <div className="books-grid">
      {books.map(book => (
        <div key={book.id} className="book-item">
          <img src={book.imageLinks.thumbnail} alt={book.title} />
          <p dangerouslySetInnerHTML={{ __html: truncateText(book.title, 3) }} />
          <p dangerouslySetInnerHTML={{ __html: truncateText(book.authors.join(', '), 3) }} />
          <p className='free'>Free</p>
          <p></p>
        </div>
      ))}
    </div>
  );
};

export default BooksList;
