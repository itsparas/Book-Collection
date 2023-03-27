const Book = require("../../../models/book/index");

const updateBook = async (req, res) => {
  try {
    const { author, bookDescription, price, bookName } = req.body;
    const bookId = req.params.bookid;

    const existingBook = await Book.findById(bookId);
    if (!existingBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (req.role === "user") {
      if (existingBook.userId.toString() !== req.userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      existingBook.author = author || existingBook.author;
      existingBook.bookDescription =
        bookDescription || existingBook.bookDescription;
      existingBook.bookName = bookName || existingBook.bookName;
      existingBook.price = price || existingBook.price;

      await existingBook.save();
      return res
        .status(201)
        .json({ message: "Book updated successfully by user" });
    } else {
      existingBook.author = author || existingBook.author;
      existingBook.bookDescription =
        bookDescription || existingBook.bookDescription;
      existingBook.bookName = bookName || existingBook.bookName;
      await existingBook.save();
      return res
        .status(201)
        .json({ message: "Book updated successfully by admin" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = updateBook;
