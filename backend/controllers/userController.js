import User from "../model/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public

const AUTH_USER = async (req, res) => {
  const { email, password } = req.body;

  let user;
  try {
    user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "User Not Found" });
    }

    if (!(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Incorrect Password" });
    }

    generateToken(res, user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "server error" });
  }
};

// @desc    Register User
// @route   POST /api/users
// @access  Public

const REGISTER_USER = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      name,
      email,
      password,
      isAdmin: false,
    });

    if (user) {
      generateToken(res, user._id);

      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (err) {
    res.status(500).json({ message: "Unable to create user" });
  }
};

// @desc    Logout User / clear cookie
// @route   POST /api/users/logout
// @access  Private

const LOGOUT_USER = async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged Out" });
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private

const GET_USER_PROFILE = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    console.log("USER => ", user);
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong while fetching user profile" });
  }
};
// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private

const UPDATE_USER_PROFILE = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    console.log("USER => ", user);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;

      if (req.body.password) {
        user.password = await bcrypt.hash(req.body.password, 11);
      }

      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong while fetching user profile" });
  }
};

// @desc    Get Users
// @route   GET /api/users
// @access  Private/Admin

const GET_USERS = async (req, res) => {
  res.send("Get Users");
};
// @desc    Get User by id
// @route   GET /api/users
// @access  Private/Admin

const GET_USER_BY_ID = async (req, res) => {
  res.send("Get Users by id");
};

// @desc    Delete User
// @route   DELETE /api/users/:id
// @access  Private/Admin

const DELETE_USER = async (req, res) => {
  res.send("Delete User");
};
// @desc    Update User
// @route   PUT /api/users/:id
// @access  Private/Admin

const UPDATE_USER = async (req, res) => {
  res.send("Update User");
};

const userController = {
  UPDATE_USER,
  DELETE_USER,
  GET_USERS,
  UPDATE_USER_PROFILE,
  GET_USER_PROFILE,
  LOGOUT_USER,
  REGISTER_USER,
  AUTH_USER,
  GET_USER_BY_ID,
};

export default userController;
