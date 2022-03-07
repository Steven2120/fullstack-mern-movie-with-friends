//imports mongoose
const mongoose = require("mongoose");

//creates new Schema sets 5 different keys and also provides each one with types and makes unique
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  friends: [{ type: mongoose.Schema.ObjectId, ref: "friend" }],
});

//exports Schema
module.exports = mongoose.model("user", userSchema);
