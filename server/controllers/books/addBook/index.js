const Book = require("../../../models/book/index");

const addBook = async (req, res) => {
  try {
    const { author, bookDescription, price, bookName } = req.body;

    if (req.role !== "user") {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (!author || !bookDescription || !price || !bookName) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (parseFloat(price) <= 0 || isNaN(parseFloat(price))) {
      return res
        .status(400)
        .json({ message: "Price must be a positive number" });
    }

    const existingBook = await Book.findOne({
      author,
      bookDescription,
      bookName,
      price,
      userId: req.userId,
    });

    if (existingBook) {
      return res.status(400).json({ message: "Book already exists" });
    }

    const book = new Book({
      author,
      bookDescription,
      bookName,
      price,
      userId: req.userId,
    });

    await book.save();

    res.status(201).json({ message: "Book saved successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = addBook;
