import chalk from "chalk";
import Post from "../models/post.js";
import cloudinary from "../config/cloudinary.js";
export const readPosts = async (req, res) => {
  try {
    
    const getPosts = await Post.find({ author: req.user._id }).populate({
      path: "author",
      model: "User",
      select: "username email",
    }).sort({createdAt : -1});
    console.log("get posts " + getPosts)
    return res.status(200).json(getPosts);
  } catch (error) {
    console.log(`${chalk.red.bold("Error reading posts")} ${error}`);
    res.status(500).json(error.message);
  }
 
};
export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    let result;
    if (req.file) {
      let encodedImage = `data:image/jpeg;base64,${req.file.buffer.toString(
        "base64"
      )}`;
      result = await cloudinary.uploader.upload(encodedImage, {
        resource_type: "image",
        transformation: [{ width: 500, height: 500, crop: "limit" }],
        encoding: "base64",
      });
    }
    const postCreate = new Post({
      title: title,
      content: content,
      image: result?.url || null,
      author: currentUser,
    });

    await postCreate.save();
    return res.status(201).json(postCreate);
  } catch (error) {
    console.log(`${chalk.red.bold("Error registering post")} ${error}`);
    res.status(500).json(error.message);
  }
};
