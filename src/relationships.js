// Import your models
const User = require('./blog/model/authModel');
const Post = require('./blog/model/postModel');
const Comment = require('./blog/model/commentModel');

// Define relationships here
User.hasMany(Post);
User.hasMany(Comment);
Post.belongsTo(User, { foreignKey: 'UserId' });
Post.hasMany(Comment);
Comment.belongsTo(User);
Comment.belongsTo(Post);
