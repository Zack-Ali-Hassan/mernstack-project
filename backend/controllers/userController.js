import chalk from "chalk";
import User from "../models/user.js";
import Jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.js";
export const readUser = async (req, res) => {
  try {
    const getUser = await User.find({});
    return res.status(201).json(getUser);
  } catch (error) {
    console.log(`${chalk.red.bold("Error reading user")} ${error}`);
    res.status(500).json(error.message);
  }
};
export const registerUser = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const isUserExist = await User.findOne({
      $or: [
        { email: email.toLowerCase() },
        { username: username.toLowerCase() },
      ],
    });
    if (isUserExist)
      return res.status(400).json("email or username already exists");
    const userInfo = new User({
      email: email,
      username: username,
      password: password,
    });

    await userInfo.save();
    userInfo.password = undefined;
    return res.status(201).json(userInfo);
  } catch (error) {
    console.log(`${chalk.red.bold("Error registering user")} ${error}`);
    res.status(500).json(error.message);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const isUserExist = await User.findOne({
      email: email.toLowerCase(),
    }).select("+password");
    if (!isUserExist)
      return res
        .status(400)
        .json("Email is wrong, please provide a valid email");
    const isCorrectPassword = await isUserExist.comparePassword(password);
    if (!isCorrectPassword)
      return res
        .status(400)
        .json("Password is wrong, please provide a valid password");
    const expiresIn = 7 * 24 * 60 * 60;
    const token = Jwt.sign({ _id: isUserExist._id }, JWT_SECRET, {
      expiresIn: expiresIn,
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: expiresIn * 1000,
    });
    isUserExist.password = undefined;
    return res.status(200).send({ ...isUserExist.toJSON(), expiresIn });
  } catch (error) {
    console.log(`${chalk.red.bold("Error login user")} ${error}`);
    res.status(500).json(error.message);
  }
};
