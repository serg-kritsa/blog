import { applyMiddleware, createStore } from "redux"

import logger, { createLogger } from "redux-logger"
// import thunk from "redux-thunk"
// import promise from "redux-promise-middleware"

import reducer from "./reducers"

export const store = createStore(
  reducer, 
  {}, 
  applyMiddleware(
    // promise, 
    createLogger({ collapsed: true })
  ) 
)
    
    