const { DataTypes } = require('sequelize');
const db = require('../../db');
// const Post = require('./postModel'); // Import the Post model
// const Comment = require('./commentModel'); // Import the Comment model

const User = db.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// relationships here
// User.hasMany(Post);
// User.hasMany(Comment);


module.exports = User;
