require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const testRouter = require('./routes/userRoute.js')
const authRouter = require('./routes/authRoute.js')
const listRouter = require('./routes/listRoute.js')
const cookieParser = require('cookie-parser')
const cors = require('cors');

const app = express();

// allow json
app.use(express.json())

const PORT = process.env.PORT
const uri = process.env.MONGO_URI

app.use(cookieParser())

// Example CORS configuration in your server

app.use(cors({
  origin: 'https://devstashh.onrender.com',
  credentials: true, // enable credentials (cookies, authorization headers)
}));

// user api route
app.use('/api/user', testRouter)

// auth api route
app.use('/api/auth', authRouter)

// list api route
app.use('/api/list', listRouter)

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

// connect to database(mongodb)
mongoose
  .connect(uri)
  .then(() => {
    
  // connect to the server
  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
  })
  console.log("Connected to database")
  })
  .catch((err) => {
    console.log("Error connecting to the database:",err.message)
  })

