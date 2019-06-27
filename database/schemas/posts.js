const Mongoose = require('mongoose');

const posts = new Mongoose.Schema({
  id: {type: Number, required: true},  
  userId: {type: Number, required: true},  
  title: {type: String, required: true},
  body: {type: String, required: true},  
  // likeCounter: {type: Number, required: true},  
  // hasLike: {type: Boolean, required: true},  
  fans: {type: Array, required: true},  
})

module.exports = posts