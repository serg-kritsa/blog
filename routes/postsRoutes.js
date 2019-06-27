const db = require('../database')
const constants = require('../constants')
// curl -X PUT http://localhost:300/posts/1 -d "likeCounter=1"
const posts = [
{
  method: 'GET', path:'/posts',
  handler: async (request) => {
    console.log('POSTS GET path');      
    return db.posts.find();
  },  
  options: {
    cors: true,
  }
},
{
  method: 'POST', path:'/posts',
  handler: async (request) => {
    console.log('POSTS POST path', request.payload.length); 
    let posts = []
    for(let post of request.payload){
      posts.push({
        ...post,
        fans: [],
      })
    }
    console.log('POST path', posts.length);
    // console.log(res);
    
    return db.posts.insertMany(posts);
  },
  options: {cors: true,
    // auth: {
    //   strategy: constants.AUTHENTIFICATION_BEARER,
    //   scope: ['librarian']
    // }
  }
},
{
  method: 'PUT', path: '/posts/{postId}',
  handler: async (request) => {
    console.log('POSTS PUT path', request.payload); 
    console.log('---POSTS PUT path', request.params); 
    if(request.payload.hasOwnProperty('operation')){
      let res = await db.posts.findOne(
        {id: request.params.postId}, {fans:1,_id:0})
      let fans = res.fans
      if(request.payload.operation === 'add')
      fans.push(request.payload.currentUserId)
      else fans = fans.filter(fan => fan != request.payload.currentUserId)
      console.log('POSTS PUT operation', fans);
      
      return db.posts.updateOne(
        {id: request.params.postId}, 
        {fans: fans}
      )
    }
    else {
      console.log('POSTS PUT payload', request.payload);
      return db.posts.updateOne(
        {id: request.params.postId}, 
        request.payload
      ) 
    }
  },
  options: {
    cors: true,
    // auth: {
    //   strategy: Auth.Bearer,
    //   scope: ['librarian']
    // }
  }
},
{
  method: 'DELETE',
  path: '/posts/{postId}',
  handler: (request) => {
      return db.posts.deleteOne({id: request.params.postId});
  },
  options: {cors: true}
},
]
module.exports = posts