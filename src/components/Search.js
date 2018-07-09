import React, { Component } from 'react';
import { MdSearch, MdArrowBack } from 'react-icons/lib/md';
import { Link } from 'react-router-dom';
import BooksApi from '../utils/BooksApi';
import './styles/search.css';

import Shelf from './Shelf';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      query: '',
      latestQuery: '',
      books: []
    };
  }

  _setQuery(query) {
    this.setState({ ...this.state, query });
  }

  _isEnter(key) {
    if (key === 'Enter') {
      this._doSearch();
    }
  }

  _doSearch() {
    if (!this.state.query) {
      alert('Fill up the search field first!');
      return;
    }
    new BooksApi().search(this.state.query).then(data => {
      if (data.error) {
        alert(data.error);
        return;
      }
      this.setState({
        ...this.state,
        books: data.books,
        latestQuery: this.state.query,
        query: ''
      });
    });
  }

  render() {
    const { books, query, latestQuery } = this.state;

    return (
      <div className="Search">
        <div className="input-group">
          <input
            type="text"
            placeholder="Search for..."
            value={query}
            onChange={e => this._setQuery(e.target.value)}
            onKeyPress={e => this._isEnter(e.key)}
          />
          <button onClick={() => this._doSearch()}>
            <MdSearch />
          </button>
        </div>
        {latestQuery && <h1>Results for "{latestQuery}"</h1>}
        {(books &&
          books.length > 0) && (
            <Shelf
              books={books.filter(b => !b.shelf)}
              updateBook={this.props.updateBook}
            />
          )}
        <Link to="/">
          <button className="float-button">
            <MdArrowBack />
          </button>
        </Link>
      </div>
    );
  }
}
export default Search;
