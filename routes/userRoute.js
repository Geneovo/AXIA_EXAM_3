const express = require("express");
const {
  createUser,
  loginUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const userRouter = express.Router();

userRouter
  // Create a user
  .post("/create", createUser)

  // Login user
  .post("/login", loginUser)

  // Get all users
  .get("/all", getUsers)

  // Get a single user
  .get("/user/:id", getUserById)

  // Update a user
  .put("/user/:id", updateUser)

  // Delete a user
  .delete("/user/:id", deleteUser);

module.exports = userRouter;
