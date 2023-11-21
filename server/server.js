require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const testRouter = require('./routes/userRoute.js')
const authRouter = require('./routes/authRoute.js')
const cookieParser = require('cookie-parser')

const app = express();

// allow json
app.use(express.json())

const PORT = process.env.PORT
const uri = process.env.MONGO_URI

app.use(cookieParser())

// test api route
app.use('/api/user', testRouter)

// auth api route
app.use('/api/auth', authRouter)

// create a middleware for catching errors
app.use((err, req, res, next) => {

  // getting the error status code
  const statusCode = err.statusCode || 500;

  // getting the error message
  const message = err.message || "Internal server error"

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message
  })
}) 

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

