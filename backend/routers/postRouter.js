import express from 'express';
import { createPost, readPosts } from '../controllers/postController.js';
import { authenticate } from '../middleware/authenticate.js';
import upload from '../middleware/upload.js';
const postRouter = express.Router();
postRouter.get("/get-user-posts", readPosts)
postRouter.post("/register-post",authenticate,upload.single("image"), createPost)
export default postRouter;