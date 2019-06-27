import React, { Component } from 'react'
import SearchPostsContainer from './posts/SearchPostsContainer'
import axios from 'axios'
import { SERVER_URL, } from '../fe-constants'
import { store } from '../redux/store'
import {addPostsData} from '../redux/reducers/postActions'
import {addUserData} from '../redux/reducers/userActions'
import {addCommentData} from '../redux/reducers/commentActions'
import { Container } from 'react-bootstrap';

export default class Home extends Component {
  componentDidMount(){
    this.loadPosts()
    this.loadUsers()
    this.loadComments()
  }
  async loadComments(){
    let dbComments = await axios.get(`${SERVER_URL}/comments`)
    console.log('comments in db', dbComments.data.length);
    if(dbComments.data.length == 0){
      let comments = await axios.get('http://jsonplaceholder.typicode.com/comments')
      let result = await axios.post(`${SERVER_URL}/comments`, comments.data)
      console.log('comments are created', result.data.length);
      if(result.data.length > 0) store.dispatch(addCommentData(result.data))
    } else store.dispatch(addCommentData(dbComments.data))
  }
  async loadUsers(){
    // rest > mongo > redux
    let dbUsers = await axios.get(`${SERVER_URL}/users`)
    console.log('users in db', dbUsers.data.length);
    if(dbUsers.data.length == 0){
      let users = await axios.get('http://jsonplaceholder.typicode.com/users')
      let result = await axios.post(`${SERVER_URL}/users`, users.data)
      console.log('users is created', result.data.length);
      if(result.data.length > 0) store.dispatch(addUserData(result.data))
    } else store.dispatch(addUserData(dbUsers.data))
  }
  async loadPosts(){
    // rest > mongo > redux
    let dbPosts = await axios.get(`${SERVER_URL}/posts`, 
      // {headers: {'Authorization': 'Bearer 0da5ab2b-9d38-491e-91af-bf12c6436975'}}
      )
    console.log('posts in db', dbPosts.data.length);
    if(dbPosts.data.length == 0){
      let posts = await axios.get('http://jsonplaceholder.typicode.com/posts')
      // id  userId title body
      let result = await axios.post(`${SERVER_URL}/posts`, posts.data)
      console.log('posts are created', result.data.length);
      
      if(result.data.length > 0) store.dispatch(addPostsData(result.data))
    } else store.dispatch(addPostsData(dbPosts.data))
  }
  render() {
    return (
      <div className="container">
        <h1 className="text-primary">Главная страница сайта</h1>
        <SearchPostsContainer/>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est nobis odit doloribus, architecto eligendi ipsum numquam omnis, optio necessitatibus reiciendis, non vel dolor dolores adipisci voluptatem vitae. Error, numquam. Explicabo ratione quod quisquam!</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est nobis odit doloribus, architecto eligendi ipsum numquam omnis, optio necessitatibus reiciendis, non vel dolor dolores adipisci voluptatem vitae. Error, numquam. Explicabo ratione quod quisquam!</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est nobis odit doloribus, architecto eligendi ipsum numquam omnis, optio necessitatibus reiciendis, non vel dolor dolores adipisci voluptatem vitae. Error, numquam. Explicabo ratione quod quisquam!</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est nobis odit doloribus, architecto eligendi ipsum numquam omnis, optio necessitatibus reiciendis, non vel dolor dolores adipisci voluptatem vitae. Error, numquam. Explicabo ratione quod quisquam!</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est nobis odit doloribus, architecto eligendi ipsum numquam omnis, optio necessitatibus reiciendis, non vel dolor dolores adipisci voluptatem vitae. Error, numquam. Explicabo ratione quod quisquam!</p>
      </div>
    )
  }
}
