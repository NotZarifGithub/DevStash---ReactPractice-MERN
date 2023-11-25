const bcrypt = require('bcryptjs');
const User = require('../models/userModel.js');
const errorHandler = require('../utils/error.js');
const List = require('../models/listModel.js');

const userController = (req, res) => {
  res.send("hello world")
}

const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, 'You can only update your own account!'));
  try {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
          address: req.body.address,
          city: req.body.city,
          state: req.body.state,
          zipcode: req.body.zipcode,
          country: req.body.country,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  if (req.params.id !== req.params.id) 
    return next(errorHandler(401, "You can only delete your own account"))
  try {
    await User.findByIdAndDelete(req.params.id)
    res.clearCookie("access_token")
    res.status(200).json({message:"User has been deleted"})
  } catch (error) {
      next(error)
  }
}

const getUserList = async ( req, res, next ) => {
  if (req.user.id === req.params.id) {
    try {
      const list = await List.find({user: req.params.id})
      if (list.length > 0) return res.status(200).json(list)
      res.status(404).json({message: "the list is empty"})
    } catch (error) {
      next(error)
    }
  } else {
    return next(errorHandler(401, "You can only view your own list!"))
  }
}

module.exports = {
  userController,
  updateUser,
  deleteUser,
  getUserList,
};