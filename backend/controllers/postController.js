import chalk from "chalk";
import Post from "../models/post.js";
import cloudinary from "../config/cloudinary.js";
export const readPosts = async (req, res) => {
  try {
    const getPosts = await Post.find({ author: req.user._id })
      .populate({
        path: "author",
        model: "User",
        select: "username email",
      })
      .sort({ createdAt: -1 });
     res.status(200).json(getPosts);
  } catch (error) {
    console.log(`${chalk.red.bold("Error reading posts")} ${error}`);
    res.status(500).json(error.message);
  }
};
export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const currentUser = req.user._id;
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
export const updatePost = async (req, res) => {
  try {
    const updateFields ={
      title: req.body.title,
      content : req.body.content
    }
    const currentUser = req.user._id;
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
      updateFields.image =result.url;
    }
    const updateData = await Post.findByIdAndUpdate(req.params.id,updateFields,{new:true})
    if(!updateData) return res.status(400).json("Post is not exist")
    return res.status(201).json(updateData);
  } catch (error) {
    console.log(`${chalk.red.bold("Error updating post")} ${error}`);
    res.status(500).json(error.message);
  }
};
export const deletePost = async (req, res) => {
  try {
    const deletePost = await Post.findByIdAndDelete(req.params.id);
    if(!deletePost) return res.status(400).json("Post is not exist")
    res.status(200).json("Post deleted successfully")
  } catch (error) {
    console.log(`${chalk.red.bold("Error deleting post")} ${error}`);
    res.status(500).json(error.message);
  }
};
