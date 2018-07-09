import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Shelf from './Shelf';

class Shelfs extends Component {
  render() {
    const { books, shelfs, updateBook } = this.props;
    return (
      <div>
        {books &&
          shelfs &&
          Object.keys(shelfs).map(shelf => (
            <div key={shelf}>
              <h1>{shelfs[shelf]}</h1>
              <Shelf books={books.filter(b => b.shelf === shelf)} updateBook={updateBook}/>
            </div>
          ))}
        <Link to="/search">
            <button className="float-button">
                +
            </button>
        </Link>
      </div>
    );
  }
}

export default Shelfs;
