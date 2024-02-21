import chalk from "chalk";
import User from "../models/user.js";
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
