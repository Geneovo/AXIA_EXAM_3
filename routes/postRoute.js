const express = require('express');

const postRouter = express.Router();

postRouter
    // Create a post
    .post('/create', createPost)

    // Get all posts
    .get('/all', getPosts)

    // Get a single post
    .get('/:id', getPostById)

    // Update a post
    .put('/:id', updatePost)

    // Delete a post
    .delete('/:id', deletePost);

module.exports = postRouter;