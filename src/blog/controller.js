const pool = require("../../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createUserQuery, getUserQuery, createPostQuery, getAllPostsQuery, getPostByIdQuery, updatePostQuery, deletePostQuery } = require("./queries");
const config = require('../../config.json');
const secretKey = config.jwtSecret;


const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the user with the same email already exists
    const userCheck = await pool.query(getUserQuery, [email]);
    if (userCheck.rows.length > 0) {
      return res.status(400).json({ error: "User with this email already exists" });
    }

    // Hash the password for security
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Store the user in the database
    const result = await pool.query(createUserQuery, [username, email, hashedPassword]);
    const user = result.rows[0];

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user with the provided email exists
    const userResult = await pool.query(getUserQuery, [email]);
    const user = userResult.rows[0];

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      // Passwords match - generate and return a JWT token with user's ID
      const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: "1h" });
      res.status(200).json({ message: "Login successful", token });
    } else {
      // Passwords don't match
      res.status(401).json({ error: "Incorrect password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create a new post
const createPost = async (req, res) => {
    const { authorization } = req.headers;
  
    if (!authorization || !authorization.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
    }
  
    const token = authorization.split('Bearer ')[1];
  
    // Verify the token and retrieve the user's ID
    jwt.verify(token, secretKey, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
      }
  
      const user_id = decoded.userId; // Get the user's ID from the token payload
  
      try {
        const { title, content } = req.body;
        const result = await pool.query(createPostQuery, [user_id, title, content]);
        res.status(201).json({ message: 'Post created successfully', post: result.rows[0] });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });
  };
  

// Retrieve all posts
const getAllPosts = async (req, res) => {
  try {
    const result = await pool.query(getAllPostsQuery);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Retrieve a single post by ID
const getPostById = async (req, res) => {
  const postId = req.params.id;
  try {
    const result = await pool.query(getPostByIdQuery, [postId]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Post not found' });
    } else {
      res.status(200).json(result.rows[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a post by ID
const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { title, content } = req.body;

  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
  }

  const token = authorization.split('Bearer ')[1];

  jwt.verify(token, secretKey, async (err, user) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }

    try {
      await pool.query(updatePostQuery, [title, content, postId]);
      res.status(200).json({ message: 'Post updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
};

// Delete a post by ID
const deletePost = async (req, res) => {
  const postId = req.params.id;

  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
  }

  const token = authorization.split('Bearer ')[1];

  jwt.verify(token, secretKey, async (err, user) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }

    try {
      await pool.query(deletePostQuery, [postId]);
      res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
};

module.exports = {
  signup,
  login,
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};
