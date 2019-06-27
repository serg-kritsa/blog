const Mongoose = require('mongoose');

class Connect {
  constructor(mongoUri) {
    this.mongoUri = mongoUri
  }
  connect() {
    console.log('Connected to Mongo DB');
    return Mongoose.connect(this.mongoUri, { useNewUrlParser: true });
  }
  createModel(name, schema) {
    return Mongoose.model(name, schema);
  }
}
module.exports = new Connect('mongodb://localhost:27017/blog');
// module.exports = new Connect('mongodb+srv://q:q@cluster0-basxu.mongodb.net/blog?retryWrites=true&w=majority');
