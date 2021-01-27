import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel.js";

import generateToken from "../utils/generateToken.js";

//@desc auth user and get the token
//@route POST /api/user/login
//@access Public
const authUser = expressAsyncHandler(async (req, res) => {

  console.log("autUser");
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });
  console.log(user);

  console.log(password);

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

//@desc register a new user
//@route POST /api/user
//@access Public
const registerUser = expressAsyncHandler(async (req, res) => {
  console.log("RegisterUser");

  const { name, email, password } = req.body;

  const userExit = await User.findOne({ email: email });


  if (userExit) {
    res.status(400);
    throw new Error("User already exits");
  }

  const user = await User.create({ name, email, password });

  console.log(userExit, user);

  if(user){
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id)
      })
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//@desc Get user profile
//@route Get /api/user/profile
//@access Private
const getUserProfile = expressAsyncHandler(async (req, res) => {
  console.log("GetUserProfile");

  const user = await User.findById(req.user._id);
  console.log(user);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc Get user profile
//@route Get /api/user/all-users/:id
//@access Private
const getAllUsers = expressAsyncHandler(async (req, res) => {
  console.log("GetUserProfile");

  const currentUser = await User.findById(req.params.id);

  console.log("Admin", currentUser.isAdmin, currentUser.name);

  if(!currentUser.isAdmin){
    res.status(400);
    throw new Error("User does not have admin rights");
  }

  const user = await User.find();
  console.log(user);

  if (user) {
    res.json({
      users: user
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});


//@desc Update user profile
//@route PUT /api/user/profile
//@access Private
const updateUserProfile = expressAsyncHandler(async (req, res) => {
  console.log("UpdateUserProfile");

  const user = await User.findById(req.user._id);
  console.log(user);

  const {name, email, password} = req.body;

  if (user) {
    user.name = name || user.name;
    user.email = email || user.email;
    if(password){
      user.password = password;
    }

    const updateUser = await user.save();

    res.json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      isAdmin: updateUser.isAdmin,
      token: generateToken(updateUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export { authUser, getUserProfile, registerUser, updateUserProfile, getAllUsers };
