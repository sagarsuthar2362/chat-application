import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";
import { uploadOnCloudinary } from "../configs/cloudinary.js";

export const signUp = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    const checkUserExists = await User.findOne({ username });
    if (checkUserExists) {
      return res.status(400).json({ message: "user already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
    });
    const token = generateToken(newUser._id);
    res.cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      secure: true,
      httpOnly: true,
      sameSite: "None",
    });
    return res
      .status(201)
      .json({ message: "User created succesfully", token, newUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const checkUserExists = await User.findOne({ username });
    if (!checkUserExists) {
      return res.status(404).json({ message: "user does not exist" });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      checkUserExists.password
    );
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "invalid credentials" });
    }
    const token = generateToken(checkUserExists._id);
    res.cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      secure: true,
      httpOnly: true,
      sameSite: "None",
    });
    return res
      .status(200)
      .json({ message: "user logged in succesfully", token, checkUserExists });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    } else {
      res.cookie("token", "");
      return res.status(200).json({ message: "user logged out" });
    }
  } catch (error) {
    console.log("logout error", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select("-password");
    return res.status(200).json({ user });
  } catch (error) {
    console.log(error);
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.userId;
    let image;

    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
    }
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Name is empty" });
    }
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, image },
      { new: true }
    ).select("-password");
    return res
      .status(200)
      .json({ message: "User edit succesfull", updatedUser });
  } catch (error) {
    console.log("update profile error", error);
    return res.status(500).json({ message: "server error" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.userId } }).select(
      "-password"
    );
    return res
      .status(200)
      .json({ message: "users fetched succesfully", users });
  } catch (error) {
    console.log("get all users error", error);
  }
};
