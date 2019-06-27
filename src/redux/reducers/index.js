import { combineReducers } from "redux"

import posts from "./postReducers"
import users from "./userReducers"
import comments from './commentReducers'

export default combineReducers({
  posts,
  users,
  comments,
})