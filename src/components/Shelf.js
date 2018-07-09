import React, { Component } from 'react';
import './styles/shelfs.css';

import BookCard from './BookCard';

class Shelf extends Component {
  render() {
    const { books, updateBook } = this.props;
    return (
      <div className="Shelf">
        {books && books.map(b => <BookCard key={b.id} book={b} updateBook={updateBook}/>)}
      </div>
    );
  }
}

export default Shelf;
