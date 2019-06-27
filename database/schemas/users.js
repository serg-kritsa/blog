const Mongoose = require('mongoose');
const uuid = require('uuid');

const users = new Mongoose.Schema({
  login: {type: String, required: true },
  password: {type: String, required: true},
  uuid: {type: String, required: true},
  id: {type: Number, required: true},
  scope: {type: String, required: true},
  name: {type: String, required: true},
  phone: {type: String, required: true},
  email: {type: String, required: true},
  address: {
    suite: {type: String, },
    street: {type: String, },
    city: {type: String, },
  }
}, {
  timestamps: true
})
module.exports = users;