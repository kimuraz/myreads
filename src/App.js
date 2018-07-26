import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import BooksApi from './utils/BooksApi';
import './index.css';

import Shelfs from './components/Shelfs';
import Search from './components/Search';

class App extends Component {
  constructor() {
    super();
    this.state = {
      books: null,
      shelfs: {
        currentlyReading: 'Currently Reading',
        read: 'Read',
        wantToRead: 'Want To Read'
      }
    };

    this.updateBook = this.updateBook.bind(this);
  }

  componentDidMount() {
    const api = new BooksApi();
    api.getAll().then(data => {
      this.setState({ ...this.state, books: data.books });
    });
  }

  updateBook(book) {
    const idx = this.state.books.findIndex(b => b.id === book.id);
    const api = new BooksApi();
    api.update(book, book.shelf);
    if (idx !== -1) {
      const newBooks = [...this.state.books];
      newBooks.splice(idx, 1, book);
      this.setState({
        ...this.state,
        books: newBooks
      });
    } else {
      this.setState({ ...this.state, books: [...this.state.books, book] });
    }
  }

  render() {
    const { books, shelfs } = this.state;

    return (
      <div className="App">
        <header>
          <h1>My Reads</h1>
        </header>
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <Shelfs
                  books={books}
                  shelfs={shelfs}
                  updateBook={this.updateBook}
                />
              )}
            />
            <Route
              path="/search"
              render={() => (
                <Search
                  addBook={this.addBook}
                  updateBook={this.updateBook}
                  books={books}
                />
              )}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
