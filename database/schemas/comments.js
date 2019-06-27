const Mongoose = require('mongoose');

const comments = new Mongoose.Schema({
  postId: {type: Number, required: true},  
  id: {type: Number, required: true},  
  name: {type: String, required: true},
  email: {type: String, required: true},
  body: {type: String, required: true},  
})

module.exports = comments