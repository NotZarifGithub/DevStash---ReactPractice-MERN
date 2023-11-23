const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrls: {
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