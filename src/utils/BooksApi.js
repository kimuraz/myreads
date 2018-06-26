/*
* @description Represents the book API handler.
*/
class BooksApi {
  /*
    * @description Apply the default settings to this class.
    * @constructor
    */
  constructor() {
    this.api = 'https://reactnd-books-api.udacity.com';
    this.token = localStorage.token;
    if (!this.token) {
      this.token = localStorage.token = Math.random()
        .toString(36)
        .substr(-8);
    }
    this.headers = {
      headers: {
        Accept: 'application/json',
        Authorization: this.token
      }
    };
  }

  /*
    * @description Performs a GET call to the API with a book ID
    * @param {number} A book ID
    * @returns {promisse} Fetch request to /books/:id
    */
  get(id) {
    return fetch(`${this.api}/books/${id}`, { ...this.headers }).then(res =>
      res.json()
    );
  }

  /*
    * @description Performs a GET call to the API retrieving all boks
    * @returns {promisse} Fetch request to /books
    */
  getAll() {
    return fetch(`${this.api}/books`, { ...this.headers }).then(res =>
      res.json()
    );
  }

  /*
    * @description Performs a PUT call to the API to add a book
    * @param {object} A book object
    * @param {object} A shelf object
    * @returns {promisse} Fetch request to /books/:id
    */
  update(book, shelf) {
    return fetch(`${this.api}/books/${book.id}`, {
      method: 'PUT',
      headers: {
        ...this.headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ shelf })
    }).then(res => res.json());
  }

  /*
    * @description Performs a POST call to the API to search for books
    * @param {string} A query to search 
    * @returns {promisse} Fetch request to /
    */
  search(query) {
    return fetch(`${this.api}/search`, {
      method: 'POST',
      headers: {
        ...this.headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query })
    }).json(res => res.json());
  }
}

export default BooksApi;
