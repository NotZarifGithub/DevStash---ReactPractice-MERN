const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageURL: {
    type: Array,
    required: true,
  },
  user: {
    type: String,
    ref: "User",
    required: true,
  }
})

const List = mongoose.model("List", listSchema)

module.exports = List