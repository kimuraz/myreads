import React, { Component } from 'react';
import { MdMoreVert } from 'react-icons/lib/md';
import './styles/books.css';

import BookShelfSelect from './BookShelfSelect';

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

    return (
      <div className="Book-card">
        <BookShelfSelect book={book} updateBook={this.updateBook} />
        {book ? (
          <main className="Book-details">
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
          </main>
        ) : null}
      </div>
    );
  }
}

export default BookCard;
