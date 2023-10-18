const { DataTypes } = require('sequelize');
const db = require('../../db');
const User = require('./authModel'); // Import the User model
// const Comment = require('./commentModel'); // Import the Comment model

// Define your Post model
const Post = db.define('Post', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

// relationships here
Post.belongsTo(User, { foreignKey: 'UserId' });
// Post.hasMany(Comment);

module.exports = Post;
