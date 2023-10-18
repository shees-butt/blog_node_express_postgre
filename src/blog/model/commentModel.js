const { DataTypes } = require('sequelize');
const db = require('../../db');
// const User = require('./authModel'); // Import the User model
// const Post = require('./postModel'); // Import the Post model

const Comment = db.define('Comment', {
  comment: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

// Define relationships here using the imported models
// Comment.belongsTo(User);
// Comment.belongsTo(Post);

module.exports = Comment;
