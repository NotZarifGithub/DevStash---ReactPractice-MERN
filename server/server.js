require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();

const PORT = process.env.PORT
const uri = process.env.MONGO_URI

// connect to the server
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})

// connect to database(mongodb)
mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to database")
  })
  .catch((err) => {
    console.log(err)
  })