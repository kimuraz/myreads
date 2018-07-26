import React, { Component } from 'react';

import './styles/book-actions.css';

class BookShelfSelect extends Component {
  constructor() {
    super();

    this.state = {
      actionsList: [
        { label: 'Currently reading', shelf: 'currentlyReading' },
        { label: 'Want to Read', shelf: 'wantToRead' },
        { label: 'Read', shelf: 'read' },
        { label: 'None', shelf: null }
      ]
    };

    this._getLabel = this._getLabel.bind(this);
  }

  _getLabel(action) {
    const { label, shelf } = action;
    let checkedLabel = label;
    !this.props.book.shelf && label === 'None' && (checkedLabel = `✔ ${label}`);

    if (this.props.book.shelf === shelf) {
      return `✔ ${label}`;
    }

    return checkedLabel;
  }

  render() {
    const { book, updateBook } = this.props;
    const { actionsList } = this.state;
    return (
      <select
        id={book.id}
        value={book.shelf || 'none'}
        className="BookShelfSelect"
      >
        {actionsList.map(action => (
          <option
            label={this._getLabel(action)}
            key={action.label}
            onClick={() => updateBook(action.shelf)}
            value={action.shelf || 'none'}
          >
            {action.label}
          </option>
        ))}
      </select>
    );
  }
}

export default BookShelfSelect;
