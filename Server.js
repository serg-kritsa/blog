const Hapi = require('hapi')
const authBearer = require('hapi-auth-bearer-token')

// constants
// const Auth = require('./constants')
const constants = require('./constants')

// auth
const bearer = require('./auth/bearer')

// db
const db = require('./database/Connect')

// routes
const routes = require('./routes')

class Server {
  constructor(port) {
    this.port = port;
  }
  async start() {
    this._server = new Hapi.Server({
      port: this.port
    });
    await db.connect();
    await this._server.register([authBearer]);
    this._server.auth.strategy(constants.AUTHENTIFICATION_BEARER, 'bearer-access-token', {
      validate: bearer
    })
    this._server.route(routes);
    
    // try {
    //   await this._server.start();
    // } catch(error) {
      //   console.error(error);
      // }
      
      let res = await this._server.start();
      
      this._server.start()
        .then(_=> 
          console.log(`Server listen port ${constants.SERVER_PORT} `)
        )
        .catch(err => console.log(err))
      // console.log(res);
      
  }
}

module.exports = new Server(constants.SERVER_PORT);