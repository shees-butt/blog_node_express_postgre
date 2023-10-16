const express = require("express");
const router = express.Router();
const Controller = require("./controller");

// Define routes for user signup and login
router.post("/signup", Controller.signup);
router.post("/login", Controller.login);
// Create a new post
router.post('/createPost', Controller.createPost);

// Retrieve all posts
router.get('/showPosts', Controller.getAllPosts);

// Retrieve a single post by ID
router.get('/singlePost/:id', Controller.getPostById);

// Update a post by ID
router.put('/editPost/:id', Controller.updatePost);

// Delete a post by ID
router.delete('/deletePost/:id', Controller.deletePost);

module.exports = router;
