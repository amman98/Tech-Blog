const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

User.hasMany(Post, {
    foreignKey: 'creator_id',
    onDelete: 'CASCADE',
});

Post.belongsTo(User, {
    foreignKey: 'creator_id'
});

module.exports = {User, Post, Comment};