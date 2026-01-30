const express = require("express");
const {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
} = require("../controllers/postController");
const authMiddleware = require("../middlewares/authMiddleware");

const postRouter = express.Router();

postRouter
  // Create a post (protected)
  .post("/posts/create", authMiddleware, createPost)

  // Get all posts
  .get("/posts", getPosts)

  // Get a single post
  .get("/posts/:id", getPostById)

  // Update a post (protected)
  .put("/posts/:id", authMiddleware, updatePost)

  // Delete a post (protected)
  .delete("/posts/:id", authMiddleware, deletePost);

module.exports = postRouter;
