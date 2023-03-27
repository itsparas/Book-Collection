const Book = require("../../../models/book/index");

const getBook = async (req, res) => {
  try {
    const { bookid } = req.params;

    const existingBook = await Book.findById(bookid);

    if (!existingBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res
      .status(200)
      .json({ message: "book found successfully", data: existingBook });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = getBook;
