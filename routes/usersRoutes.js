const bcrypt = require('bcrypt');
const Boom = require('boom');
const uuid = require('uuid');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const Auth = require('../constants');
const db = require('../database');
// curl http://localhost:300/u/l -H "Authorization: Bearer 673dc1f2-498a-4f3b-87cd-2e4c1eb9447b"
// curl -X POST http://localhost:300/user/register -d "login=q&password=w"
// curl -X POST http://localhost:300/user/login -d "login=q&password=w"
// curl -X POST http://localhost:300/user/register -d "login=q&password=q"
// curl -X POST http://localhost:300/user/login -d "login=q&password=q"
// curl -X POST http://localhost:300/users -d "login=q&password=q"
const users = [
  {
    method: 'GET', path:'/users',
    handler: async (request) => {
      console.log('USERS GET path');      
      return db.users.find();
    },  
    options: { cors: true, }
  },{
  method: 'POST', path:'/users',
  handler: async (request) => {
    console.log('USERS POST path');
    let users = [] // qwerty users
    for(let user of request.payload){
      users.push({
        login: user.username,
        password: '$2b$10$zbb5SFta6iWgDUPSkEz15unuYDZnKj0UKhXoOAU5DZ21P1GdqdCNm',
        uuid: uuid.v4(),
        scope: 'user',
        id: user.id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        address: user.address,
      });
    }
    console.log('USERS path', users.length);      
    return db.users.insertMany(users);
  },  
  options: { cors: true, }
},
{
  method: 'POST', path:'/users/register',
  handler: async (request, h) => {
    const {login, password} = request.payload
    
    let idList = await db.users.find({}, {id:1})
    let nextId = idList.reduce((max, el) => Math.max(max,el.id),-1)+1    

    let user = await db.users.findOne({login})
    if(user) return h.response({'error': 'Пользователь с таким именем уже создан'}) 
    else {
      let hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) reject(err);
          resolve(hash);
        });
      });
      data = {
        login: login,
        password: hashedPassword,
        uuid: uuid.v4(),
        scope: 'user',
        id: nextId,
        name: 'Не указано',
        phone: 'Не указано',
        email: 'Не указано',
      };
      console.log('REG path', data);      
      return db.users.create(data);
    }
  },
  options: {
    cors: true,
    validate: {
      payload: Joi.object({
        login: Joi.string().min(1).max(10).required(),
        password: Joi.string().min(1).required(),
      }),
    },
  }
},
{
  method: 'POST', path:'/user/login',
  handler: async (request, h) => {
    console.log(1, request.payload);
    const {login, password} = request.payload
    let user = await db.users.findOne({ login })
    if(user) {
      let isCorrect = await bcrypt.compare(password, user.password) 
      if(isCorrect){
        console.log('LOG path', isCorrect);
        return jwt.sign(
          { id: user.id, login: user.login, scope: user.scope },
          'cryptoSecretKey',
          { expiresIn: '1h', algorithm: 'HS256' }
          );
      } else return h.response({'error': 'Неверный пароль'})
    }
    else{
      return h.response({'error': 'Пользователь не найден'})
    }
  },
  options: {
    cors: true,
    validate: {
      payload: Joi.object({
        login: Joi.string().min(1).max(3).required(),
        password: Joi.string().min(1).required(),
      }),
    },
  }
}]
module.exports = users;