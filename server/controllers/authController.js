const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const signUp = async (req, res, next) => {

  // extracting data from req.body
  const { username, email, password} = req.body

  // encypting the password using brcrypt
  const hashedPassword = bcrypt.hashSync(password, 10)

  // create a new user
  const newUser = new User({username, email, password: hashedPassword})
 
  try {

    // save the new user to the database and send a response to the client
    await newUser.save()
    res.status(201).json("User created successfully")
  } catch (err) {
    
    // response the error message to the client 
    next(err)
  } 
}

module.exports = signUp;