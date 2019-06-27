const comments = require('./commentsRoutes');
const users = require('./usersRoutes');
const posts = require('./postsRoutes');

module.exports = [].concat(comments, users, posts);
// module.exports = [ ...comments, ...users ];