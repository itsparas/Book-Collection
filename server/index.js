const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/user");
const bookRoutes = require("./routes/books");

require("dotenv").config();

const app = express();

app.use(express.json({ extended: false }));

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

//connecting database
connectDB();

app.use("/user", userRoutes);
app.use("/book", bookRoutes);

//setting up port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server is up and running at port ${PORT}`);
});
