const express = require('express');

const router = express.Router();

// Controller
// import controller function here
const { addUsers, getUsers, getUser, updateUser, deleteUser } = require('../controllers/user');

const { addBook, getBooks, getBook, updateBook, deleteBook } = require('../controllers/book');

// Route User
router.post('/user', addUsers);
router.get('/users', getUsers);
router.get('/user/:id', getUser);
router.patch('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);

//Route Book
router.post('/book', addBook);
router.get('/books', getBooks);
router.get('/book/:id', getBook);
router.patch('/book/:id', updateBook);
router.delete('/book/:id', deleteBook)

module.exports = router;
