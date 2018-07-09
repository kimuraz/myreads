import React, { Component } from 'react';
import { MdMoreVert } from 'react-icons/lib/md';
import BooksApi from '../utils/BooksApi';
import './styles/books.css';

import BookActions from './BookActions';

class BookCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menu: {
        show: false,
        x: 0,
        y: 0
      }
    };

    this.closeMenu = this.closeMenu.bind(this);
    this.updateBook = this.updateBook.bind(this);
  }

  _showMenu(evt) {
    this.setState({
      ...this.state,
      menu: { x: evt.clientX, y: evt.clientY, show: !this.state.menu.show }
    });
  }

  closeMenu() {
    this.setState({
      ...this.state,
      menu: Object.assign(this.state.menu, { show: false })
    });
  }

  updateBook(newShelf) {
    this.props.updateBook(Object.assign(this.props.book, { shelf: newShelf }));
  }

  render() {
    const { book } = this.props;
    const { menu } = this.state;

    return (
      <div className="Book-card">
        {book ? (
          <main className="Book-details">
            <MdMoreVert
              className="right-menu"
              onClick={e => this._showMenu(e)}
            />
            {book.imageLinks &&
              book.imageLinks.smallThumbnail && (
                <figure>
                  <img src={book.imageLinks.smallThumbnail} alt={book.title} />
                </figure>
              )}
            <div className="Book-text">
              <h2>{book.title}</h2>
              {book.subtitle && <h3>{book.subtitle}</h3>}
              {book.authors &&
                book.authors.map(author => (
                  <p className="authors" key={author}>
                    {author}
                  </p>
                ))}
            </div>
            {menu.show && (
              <BookActions
                book={book}
                position={menu}
                unmount={this.closeMenu}
                updateBook={this.updateBook}
              />
            )}
          </main>
        ) : null}
      </div>
    );
  }
}

export default BookCard;
