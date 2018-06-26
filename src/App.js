import React, { Component } from 'react';
import BooksApi from './utils/BooksApi';

class App extends Component {
  constructor() {
    super();
    this.state = {
      books: null
    };
  }

  componentDidMount() {
    const api = new BooksApi()
    api.getAll().then(data => {
      console.log(data);
      this.setState({ ...this.state, books: data.books });
    });
  }

  render() {
    const { books } = this.state
    return (
      <div className="App">
      </div>
    );
  }
}

export default App;
