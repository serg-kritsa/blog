const Joi = require('joi');
const Boom = require('boom');

const db = require('../database');

// constants
const Auth = require('../constants')

// curl http://localhost:300/books -H "Authorization: Bearer 673dc1f2-498a-4f3b-87cd-2e4c1eb9447b"
// curl http://localhost:300/books/39304b9b-038a-469a-8af8-0c0b22487112 -H "Authorization: Bearer 673dc1f2-498a-4f3b-87cd-2e4c1eb9447b"
const books = [{
  method: 'GET', path: '/books/{bookId?}',
  handler: (request) => {    
    try {
      if (request.params.bookId) {
        return db.books.findOne({
          uuid: request.params.bookId
        }).then(book => {
          if (book) { return book; }
          return Boom.notFound('Книга не найдена');
        })
      }
      return db.books.find();
    } catch (error) {
      console.error(error);
      return Boom.badImplementation();
    }
  },
  options: {
    cors: true,
    validate: {
      params: {
        bookId: Joi.string()
      }
    },
    auth: {
      strategy: Auth.Bearer,
      scope: ['librarian', 'user']
    }
  }
}, {
  method: 'POST', path: '/books',
  handler: (request) => {
    try {
      console.log(request.payload);
      return db.books.create(request.payload)
    } catch (error) {
      console.error(error);
      return Boom.badImplementation();
    }
  },
  options: {
    auth: {
      strategy: Auth.Bearer,
      scope: ['librarian']
    }
  }
}, {
  method: 'PUT', path: '/books/{bookId}',
  handler: (request) => {
    return database.map(book => {
      if (book.id === parseInt(request.params.bookId)) {
        return {
          ...book,
          ...request.payload
        };
      }
      return book
    })
  },
  options: {
    auth: {
      strategy: Auth.Bearer,
      scope: ['librarian']
    }
  }
}, {
  method: 'DELETE',
  path: '/books/{bookId}',
  handler: (request) => {
    try {
      return database.filter(book => book.id !== parseInt(request.params.bookId));
    } catch (error) {
      console.error(error);
      return Boom.badImplementation();
    }
  },
  options: {
    auth: {
      strategy: Auth.Bearer,
      scope: ['librarian']
    }
  }
}]

module.exports = books;