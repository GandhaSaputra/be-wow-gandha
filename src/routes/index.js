const express = require('express');

const router = express.Router();

// Controller
// import controller function here
const { addUsers, getUsers, getUser, updateUser, deleteUser, getUserBooks, getUserTransactions } = require('../controllers/user');

const { addBook, getBooks, getBook, updateBook, deleteBook } = require('../controllers/book');

const { getTransactions, addTransaction, getTransaction, updateTransaction } = require('../controllers/transaction');

// Route User
router.post('/user', addUsers);
router.get('/users', getUsers);
router.get('/user/:id', getUser);
router.patch('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);

router.get('/user-books', getUserBooks);
router.get('/user-transactions', getUserTransactions);

//Route Book
router.post('/book', addBook);
router.get('/books', getBooks);
router.get('/book/:id', getBook);
router.patch('/book/:id', updateBook);
router.delete('/book/:id', deleteBook);

//Route Transaction
router.get('/transactions', getTransactions);
router.get('/transaction/:id', getTransaction);
router.post('/transaction', addTransaction);
router.patch('/transaction/:id', updateTransaction);

module.exports = router;
