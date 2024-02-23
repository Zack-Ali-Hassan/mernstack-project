import express from 'express';
import { createPost, deletePost, readPosts } from '../controllers/postController.js';
import { authenticate } from '../middleware/authenticate.js';
import upload from '../middleware/upload.js';
const postRouter = express.Router();
postRouter.get("/get-user-posts",authenticate, readPosts)
postRouter.delete("/delete-post/:id",authenticate, deletePost)
postRouter.post("/register-post",authenticate,upload.single("image"), createPost)
export default postRouter;