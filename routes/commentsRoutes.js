const db = require('../database')
const comments = [
{
  method: 'GET', path:'/comments',
  handler: async (request) => {
    console.log('COMMENTS GET path');      
    return db.comments.find();
  },  
  options: {cors: true,}
},
{
  method: 'POST', path:'/comments',
  handler: async (request) => {
    console.log('COMMENTS POST path', request.payload.length); 
    let comments = request.payload    
    return db.comments.insertMany(comments);
  },  
  options: {cors: true,}
},
]
module.exports = comments