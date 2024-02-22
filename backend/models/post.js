import mongoose, { Schema } from "mongoose";
import validator from "validator";
const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
      validate: [
        (value) => value.length < 500,
        "Content should be up to 500 characters long",
      ],
    },
    image: {
      type: String,
      default: null,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timeStamps: true,
  }
);
const Post = mongoose.model("Post", postSchema);
export default Post;
