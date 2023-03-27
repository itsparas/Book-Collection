const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
    minlength: 3,
  },
  lname: {
    type: String,
    required: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  role: {
    type: "String",
    enum: ["admin", "user"],
    required: true,
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
