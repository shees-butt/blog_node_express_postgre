const { DataTypes } = require('sequelize');
const db = require('../../db');

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

// Define the relationships here
// Assuming that db.models.Post and db.models.Comment are valid Sequelize models
// User.hasMany(db.models.Post);
// User.hasMany(db.models.Comment);

module.exports = User;
