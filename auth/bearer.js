const db = require('../database');

// var async/await. user token drom db
async function bearer(request, authBearer, h) {
  let data, user;
  // console.log(1, authBearer);
  user = await db.users.findOne({ uuid: authBearer })
  // console.log(2, user);
  if(user) return {
    isValid: true, 
    credentials: {
      name: user.login,
      scope: user.scope
    }
  }
  else return {
    isValid: false, 
    credentials: {}
  }
}

module.exports = bearer;