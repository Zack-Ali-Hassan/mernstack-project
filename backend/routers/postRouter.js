import express from 'express';
import { createPost, deletePost, readPosts, updatePost } from '../controllers/postController.js';
import { authenticate } from '../middleware/authenticate.js';
import upload from '../middleware/upload.js';
const postRouter = express.Router();
postRouter.get("/get-user-posts",authenticate, readPosts)
postRouter.delete("/delete-post/:id",authenticate, deletePost)
postRouter.post("/register-post",authenticate,upload.single("image"), createPost)
postRouter.post("/update-post/:id",authenticate,upload.single("image"), updatePost)
export default postRouter;