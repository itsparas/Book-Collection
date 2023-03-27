const Book = require("../../../models/book/index");

const getAllBooks = async (req, res) => {
  try {
    if (req.role !== "admin") {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const existingBooks = await Book.find();

    res.status(200).json({
      message: "Books found successfully",
      data: existingBooks,
    });
  } catch (error) {
    console.error("Error while fetching books:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = getAllBooks;
