const express = require("express");

const router = express.Router();

const authorization = require("../../middleware/authoriztion");

const addBook = require("../../controllers/books/addBook");
const getBook = require("../../controllers/books/getBook");
const getBooks = require("../../controllers/books/getBooks");
const getAllBooks = require("../../controllers/books/getAllBooks");
const updateBook = require("../../controllers/books/updateBook");
const deleteBook = require("../../controllers/books/deleteBook");

router.post("/addbook", authorization, addBook); //user
router.post("/updatebook/:bookid", authorization, updateBook); //both
router.get("/getbook/:bookid", authorization, getBook); //both
router.get("/deletebook/:bookid", authorization, deleteBook); //user
router.get("/getallbooks", authorization, getAllBooks); //admin
router.get("/getbooks", authorization, getBooks); //user

module.exports = router;
