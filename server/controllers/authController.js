const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const errorHandler = require("../utils/error.js");
const jwt = require("jsonwebtoken");

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

  } catch (error) {

    // response the error message to the client 
    next(error)
  } 
}

const signIn = async (req, res, next) => {

  // extracting data from req.body;
  const { email, password } = req.body

  try {

    // checking if the email exists
    const validUser = await User.findOne({ email })

    // if it doesnt exists return error
    if (!validUser) {
      return next(errorHandler("404", "User not found"))
    }

    // checking if the user email match with the passsword
    const validPassword = bcrypt.compareSync(password, validUser.password)

    // if it doesnt match return error
    if (!validPassword) {
      return next(errorHandler("401", "Wrong credentials"))
    }

    //  generates a JSON Web Token
    const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET)

    // destructure "validUser" so that the password stay hidden
    const {password: pass, ...rest} = validUser._doc
    res
      .cookie("access_token", token, {httpOnly: true})
      .status(200)
      .json(rest)

  } catch (error) {
    next(error)
  }
}

const google = async (req, res, next) => {

  try {
    console.log('Request Body:', req.body);
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      console.log('Response to Client:', rest);
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);

    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
      console.log(req.body.name)
      const newUser = new User({
        username:
          req.body.name.split(' ').join('').toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });

      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    }

  } catch (error) {
    console.log(error)
    next(error);
  }
};

const signOut = (req, res, next) => {
  try {
    res.clearCookie('access_token')
    res.status(200).json({message: "User has been signed out"})
  } catch (error) {
      next(error)
  }
}

module.exports = {
  signUp,
  signIn,
  google,
  signOut
}