const express = require("express");

const userRouter = express.Router();

userRouter
    // Create a user
    .post('/create', createUser)

    // Get all users
    .get('/all', getUsers)

    // Get a single user
    .get('/:id', getUserById)

    // Update a user
    .put('/:id', updateUser)

    // Delete a user
    .delete('/:id', deleteUser);

module.exports = userRouter;