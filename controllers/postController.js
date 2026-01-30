const postModel = require("../models/postModel");

const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }
    
    const post = new postModel({title, content, author: req.user.id});
    await post.save();
    res.status(201).json({ post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await postModel.find().populate("author", "name email");
    return res.status(200).json({ posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await postModel.findById(id).populate("author", "name email");
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const post = await postModel.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "You are not authorized to update this post" });
    }

    const updatedPost = await postModel.findByIdAndUpdate(id, { title, content }, { new: true }).populate("author", "name email");
    return res.status(200).json({ post: updatedPost });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await postModel.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "You are not authorized to delete this post" });
    }

    await postModel.findByIdAndDelete(id);
    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
};
