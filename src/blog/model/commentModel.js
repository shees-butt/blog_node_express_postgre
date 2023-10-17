const { DataTypes } = require('sequelize');
const db = require('../../db');

// Define your Comment model
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

// Define the relationships here
// Comment.belongsTo(db.models.User);
// Comment.belongsTo(db.models.Post);

module.exports = Comment;
