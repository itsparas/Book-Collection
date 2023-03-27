const Book = require("../../../models/book/index");

const getBooks = async (req, res) => {
  try {
    if (req.role !== "user") {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.userId;

    const existingBooks = await Book.find({ userId });
    if (!existingBooks.length) {
      return res.status(404).json({ message: "No books found" });
    }

    return res
      .status(200)
      .json({ message: "Books found successfully", data: existingBooks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = getBooks;
