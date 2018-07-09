import React, { Component } from 'react';
import './styles/book-actions.css';

class BookActions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      actionsList: [
        { label: 'Currently reading', shelf: 'currentlyReading' },
        { label: 'Want to Read', shelf: 'wantToRead' },
        { label: 'Read', shelf: 'read' },
        { label: 'None', shelf: null }
      ]
    };

    this._dispose = this._dispose.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      window.addEventListener('click', this._dispose);
      window.addEventListener('scroll', this._dispose);
    }, 0);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this._dispose);
    window.removeEventListener('scroll', this._dispose);
  }

  _dispose() {
    this.props.unmount();
  }

  render() {
    const { updateBook, position, book } = this.props;
    const { actionsList } = this.state;

    return (
      <div
        className="Book-actions"
        style={{ top: `${position.y - 20}px`, left: `${position.x - 20}px` }}
        onClick={e => e.stopPropagation()}
      >
        {actionsList && actionsList.length ? (
          <ul className="actions-list">
            {actionsList.map(a => (
              <li onClick={() => updateBook(a.shelf)} key={a.shelf}>
                { book.shelf === a.shelf && '✓ ' }{a.label}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    );
  }
}

export default BookActions;
