require('dotenv').config();
const express = require('express');

const router = express.Router();

// Controller
// import controller function here
const { addUsers, getUsers, getUser, updateUser, deleteUser, getUserBooks, getUserTransactions } = require('../controllers/user');

const { addBook, getBooks, getBook, updateBook, deleteBook } = require('../controllers/book');

const { getTransactions, addTransaction, getTransaction, updateTransaction } = require('../controllers/transaction');

const { register, login } = require('../controllers/auth');

const { auth } = require('../middlewares/auth');

const { uploadFile } = require('../middlewares/uploadFile')

// Route User
router.post('/user', addUsers);
router.get('/users', getUsers);
router.get('/user/:id', getUser);
router.patch('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);

router.get('/user-books', getUserBooks);
router.get('/user-transactions', getUserTransactions);

//Route Book
router.post('/book', auth, uploadFile('bookFile'), addBook);
router.get('/books', auth, getBooks);
router.get('/book/:id', auth, getBook);
router.patch('/book/:id', auth, updateBook);
router.delete('/book/:id', auth, deleteBook);

//Route Transaction
router.get('/transactions', auth, getTransactions);
router.get('/transaction/:id', auth, getTransaction);
router.post('/transaction', auth, uploadFile('transferProof'), addTransaction);
router.patch('/transaction/:id', auth, updateTransaction);

//Router Register
router.post('/register', register);

//Route Login
router.post('/login', login);

module.exports = router;
