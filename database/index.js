const connect = require('./Connect');

// schemas
const commentsSchema = require('./schemas/comments');
const usersSchema = require('./schemas/users');
const postsSchema = require('./schemas/posts')

module.exports = {
    comments: connect.createModel('comments', commentsSchema),
    users: connect.createModel('users', usersSchema),    
    posts: connect.createModel('posts', postsSchema),
}