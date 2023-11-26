import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import testRouter from './routes/userRoute.js';
import authRouter from './routes/authRoute.js';
import listRouter from './routes/listRoute.js';
import cookieParser from 'cookie-parser';
import path from 'path';

dotenv.config();

const PORT = process.env.PORT;
const uri = process.env.MONGO_URI;

// connect to database(mongodb)
mongoose
  .connect(uri)
  .then(() => {
    // connect to the server
    app.listen(PORT, () => {
      console.log(`listening on port ${PORT}`);
    });
    console.log('Connected to database');
  })
  .catch((err) => {
    console.log('Error connecting to the database:', err.message);
  });
  const __dirname = path.resolve();


const app = express();

// allow json
app.use(express.json());

app.use(cookieParser());

// user api route
app.use('/api/user', testRouter);

// auth api route
app.use('/api/auth', authRouter);

// list api route
app.use('/api/list', listRouter);

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

// create a middleware for catching errors
app.use((err, req, res, next) => {
  // getting the error status code
  const statusCode = err.statusCode || 500;
  // getting the error message
  const message = err.message || 'Internal server error';

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
