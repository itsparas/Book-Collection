const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
  },
  bookDescription: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  bookName: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Book = mongoose.model("book", bookSchema);

module.exports = Book;
