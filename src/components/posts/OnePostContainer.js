import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {addFanAction, removeFanAction,removePostAction} from '../../redux/reducers/postActions'
import {Route, Link} from 'react-router-dom'
import axios from 'axios'
import { SERVER_URL } from '../../fe-constants'

import { Container } from 'react-bootstrap';

class OnePostContainer extends React.Component{
  constructor(props) {
    super(props)
    this.state = { isEditMode: false }
    this.postTitleInput
    this.postBodyInput
  }
  switchToEditMode(){ this.setState({isEditMode: true}) }
  cancelEditing(){ this.setState({isEditMode: false}) }
    
  async submitChanges(e, postId){
    e.preventDefault()
    let res = await axios.put(`${SERVER_URL}/posts/${postId}`, 
      {title: this.postTitleInput.value, body: this.postBodyInput.value})
    // console.log(122, res.data);
    if(res.data.ok === 1 && res.data.nModified === 1 )  
      this.props.editPost(postId, this.postTitleInput.value, this.postBodyInput.value)
      
    // console.log(11, this.props.history, this.postTitleInput.value, this.postBodyInput.value);
    // this.props.history.push('/posts');
    this.setState({isEditMode: false})
  }
  async submitComment(e, postId){
    e.preventDefault()
    // console.log(1221, postId, this.props.currentUser.login, this.commentTitleInput.value, this.commentBodyInput.value);
    // postId id name email body 

    if(this.commentTitleInput.value !='' && this.commentBodyInput.value !=''){
      
      let res = await axios.post(`${SERVER_URL}/comments`, 
        [{
          postId, 
          id: this.props.commentsNextId,
          email: this.props.currentUser.login, 
          name: this.commentTitleInput.value, 
          body: this.commentBodyInput.value,
        }]
      )
      console.log('new comment created', res.data);
      if(res.data.length > 0)
      this.props.addComment(postId, this.props.currentUser.login, 
        this.commentTitleInput.value, this.commentBodyInput.value)
        // this.props.history.push('/posts');
        // this.setState({isEditMode: false})
        this.commentTitleInput.value = ''  
        this.commentBodyInput.value = ''  
    }
  }
  async addLikeHandler(postId){
    let res = await axios.put(`${SERVER_URL}/posts/${postId}`, 
      {operation: 'add', currentUserId: this.props.currentUser.id})
    // console.log(122, res.data);
    if(res.data.ok === 1 && res.data.nModified === 1 )  
      this.props.addFan(postId, this.props.currentUser.id)
  }
  async removeLikeHandler(postId){
    let res = await axios.put(`${SERVER_URL}/posts/${postId}`, 
      {operation: 'sub', currentUserId: this.props.currentUser.id})
    if(res.data.ok === 1 && res.data.nModified === 1 )  
      this.props.removeFan(postId, this.props.currentUser.id)
  }
  async removePostHandler(postId){
    let res = await axios.delete(`${SERVER_URL}/posts/${postId}`)
    console.log('removePostHandler', res.data);    
    this.props.history.push('/posts')  
    if(res.data.ok === 1 && res.data.deletedCount === 1 )
      this.props.removePost(postId)    
  }

  render(){
    const {user, currentUser, post, comments, history, editPost, removePost} = this.props   
    
    return (<section className="container">
      <div className="post-edit">
        {this.state.isEditMode ?
          <form onSubmit={e => this.submitChanges(e, post.id)}>
            <div>
              <input ref={node => this.postTitleInput = node} type='text' defaultValue={post.title} />
            </div>
            <div>
              <textarea ref={node => this.postBodyInput = node} defaultValue={post.body} /> 
            </div>
            <input className="btn btn-success"
              type='submit' value='Подтвердить изменения' />
            <input  className="btn btn-dark"
              onClick={()=> this.cancelEditing()} type='button' value='Отмена'  />  
          </form>
          :
          <div>
            <h2>{post.title}</h2>
            <div>{post.body}</div> 
          </div>
        }
      </div>  
      <div>Автор: <Link to={'/user/'+user.id} >{user.name}</Link></div>


      <div className="post-total-likes">
        {post.fans && post.fans.length > 0 && 
          <span><i className="fa fa-heart"></i> {post.fans && post.fans.length}</span>
        }
      </div>
      <div className="post-buttons">
        {currentUser != null ? post.fans.indexOf(currentUser.id) != -1 ?
          <button className="btn btn-primary" 
              onClick={() => this.removeLikeHandler(post.id)} > 
            <i className="fa fa-thumbs-down"></i>  
            Не нравится </button>
          :
          <button className="btn btn-primary" onClick={() => this.addLikeHandler(post.id)} > 
            <i className="fa fa-thumbs-up"></i> 
            Оценить </button> 
          : ''
        }
        {currentUser != null && 
          <button className="btn btn-primary" 
          onClick={() => this.switchToEditMode()}> 
          <i className="fa fa-edit"></i> 
          Исправить </button>
        }
        {currentUser && 
          <button className="btn btn-danger" onClick={() => this.removePostHandler(post.id)} > 
            <i className="fa fa-trash"></i>  
            Удалить </button>
        }
      </div> 
      <div><Link to={'/posts'} > К заметкам </Link></div>



      {comments.length > 0 && <h3> Коментарии </h3>}
      {currentUser != null && 
        <div>
          <form onSubmit={e => this.submitComment(e, post.id)}>
            <div>
              <input ref={node => this.commentTitleInput = node} 
                type='text' placeholder='Тема коментария' />
            </div>
            <div>
              <textarea ref={node => this.commentBodyInput = node} 
                placeholder='Текст коментария'/> 
            </div>
            <input className="btn btn-primary" type='submit' value='Коментировать' />
          </form>
        </div>
      }
        {comments.map((comment, i) => {
          return (
            <div className="post-comment" key={i} > 
              <div><b>{i+1}. {comment.name}</b></div> 
              <div><i>написал {comment.email}</i></div>  
              <div>{comment.body}</div> 
            </div>
          )
        })}
    </section>)
  }
}

// console.log(postId, posts, users);
const findUser = (postId, posts, users) => {
  let currentPost = posts.find(post => post.id === parseInt(postId) )
  // console.log(111, postId, currentPost)
  // console.log(111, postId, currentPost, users.find(user => user.id === currentPost.userId))
  // console.log(0, postId, posts.length, users.length);
  return users.find(user => user.id === currentPost.userId)
}

const mapStateToProps = (state, ownProps) => ({
  user: findUser(
    ownProps.match.params.id, 
    state.posts, 
    state.users.users),
  currentUser: state.users.current,  
  post: state.posts.find(post => post.id == ownProps.match.params.id ),
  commentsNextId: state.comments.reduce((max, comment)=> Math.max(max, comment.id),0)+1,
  comments: state.comments.filter(
    comment => comment.postId == ownProps.match.params.id,
  ).reverse(),    
  history: ownProps.history,
})

const mapDispatchToProps = dispatch => ({
  addFan: (postId, currentUserId) => dispatch(
    addFanAction(postId, currentUserId)),
  removeFan: (postId, currentUserId) => dispatch(
    removeFanAction(postId, currentUserId)),
  editPost: (id, title, body) => dispatch({
    type: 'EDIT_POST', id, title, body,}),
  removePost: id => dispatch(removePostAction(id)),
  addComment: (postId, login, name, body) => dispatch({
    type: 'ADD_COMMENT', postId, login, name, body
  }),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OnePostContainer)

// OnePostContainer.propTypes = {
//   post: PropTypes.shape({
//     id: PropTypes.number.isRequired,
//     userId: PropTypes.number.isRequired,
//     title: PropTypes.string.isRequired,
//     body: PropTypes.string.isRequired,
//     hasLike: PropTypes.bool.isRequired
//   }).isRequired,
//   user: PropTypes.shape({
//     id: PropTypes.number.isRequired,
//     name: PropTypes.string.isRequired,
//   }).isRequired,
//   comments: PropTypes.arrayOf(PropTypes.shape({
//     postId: PropTypes.number.isRequired,
//     id: PropTypes.number.isRequired,
//     name: PropTypes.string.isRequired,
//     email: PropTypes.string.isRequired,
//     body: PropTypes.string.isRequired,
//   }).isRequired).isRequired,
//   addLike: PropTypes.func.isRequired,
//   removeLike: PropTypes.func.isRequired,
// }