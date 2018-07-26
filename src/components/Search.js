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
      books: []
    };
  }

  _setQuery(query) {
    this.setState({ ...this.state, query }, this._doSearch());
  }

  _doSearch() {
    setTimeout(() => {
      this.state.query && new BooksApi().search(this.state.query).then(data => {
        if (data.error) {
          alert(data.error);
          return;
        }
        this.setState({
          ...this.state,
          books: data.books,
        });
      });
    }, 300);
  }

  render() {
    const { books, query } = this.state;

    return (
      <div className="Search">
        <div className="input-group">
          <input
            type="text"
            placeholder="Search for..."
            value={query}
            onChange={e => this._setQuery(e.target.value)}
          />
          <button onClick={() => this._doSearch()}>
            <MdSearch />
          </button>
        </div>
        {query && <h1>Results for "{query}"</h1>}
        {(query && books &&
          books.length > 0) && (
            <Shelf
              books={books}
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
