import React from 'react'
import PropTypes from 'prop-types'
import {Route, Link} from 'react-router-dom'

import { connect } from 'react-redux'
import {addFanAction, removeFanAction,removePostAction} from '../../redux/reducers/postActions'

import axios from 'axios'
import { SERVER_URL } from '../../fe-constants'

import { Container } from 'react-bootstrap';

class AllPostsContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isAddingMode: false
    }
    this.postTitleInput
    this.postBodyInput
  }
  addPost(){
    this.setState({isAddingMode: true})
  }
  cancelAdding(){
    this.setState({isAddingMode: false})
  }
  async submitAddings(e){
    e.preventDefault()
    let title = this.postTitleInput.value
    let body = this.postBodyInput.value
    // console.log(21, title, body);
    
    let id = this.props.posts.reduce((max, post) => Math.max(max, post.id), 0)+1
    let userId = this.props.currentUser.id

    if(title != '' && body != '') {
      let res = await axios.post(`${SERVER_URL}/posts`, 
        [{userId, id, title, body}]      
      )
      // console.log(21, res.data);
      if(res.data.length > 0)
        this.props.addPost(this.props.currentUser.id,title, body)
    }
    this.setState({isAddingMode: false})
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
    if(res.data.ok === 1 && res.data.deletedCount === 1 )
      this.props.removePost(postId)    
  }

  render(){
    const {posts, currentUser, addFan, removeFan, addPost, removePost} = this.props  
    
    return (<section className="container">
      <h1 className="text-primary">Заметки</h1>

      <div className="post-add">
        {currentUser && !this.state.isAddingMode &&
          <button className="btn btn-primary" 
            onClick={() => this.addPost()}> 
            <i className="fa fa-plus-circle"></i>
            Добавить </button> 
        }
        {this.state.isAddingMode &&
          <form onSubmit={e => this.submitAddings(e)}>
            <div>
              <input ref={node => this.postTitleInput = node} 
                type='text' placeholder='Введите заголовок заметки' />
            </div>
            <div>
              <textarea ref={node => this.postBodyInput = node} 
                placeholder='Введите текст заметки' /> 
            </div>
            <input className="btn btn-success" type='submit' value='Сохранить' />
            <input  className="btn btn-dark" type='button' 
              onClick={()=> this.cancelAdding()} value='Отмена'  />  
          </form>
        }
      </div>

      {posts.map((post, i) => {
        return (
          <section className="post" key={i}>
            <div>
              <b>{post.title}</b>
              <Link to={'/post/'+post.id} > Читать далее...</Link>
            </div>
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
            {currentUser && 
              <button className="btn btn-danger" onClick={() => this.removePostHandler(post.id)} > 
                <i className="fa fa-trash"></i>  
                Удалить </button>
            }
            </div>
          </section>
        )
      })}
    </section>)
  }
} 
const mapStateToProps = state => ({
  posts: state.posts,
  currentUser: state.users.current, 
})
const mapDispatchToProps = dispatch => ({
  addFan: (postId, currentUserId) => dispatch(
    addFanAction(postId, currentUserId)),
  removeFan: (postId, currentUserId) => dispatch(
    removeFanAction(postId, currentUserId)),
  addPost: (currentUserId, title, body) => dispatch(
    {type: 'ADD_POST',currentUserId,title,body}),
  removePost: id => dispatch(removePostAction(id)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllPostsContainer)

AllPostsContainer.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    fans: PropTypes.array.isRequired,
    body: PropTypes.string.isRequired
  }).isRequired).isRequired,
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
  addFan: PropTypes.func.isRequired,
  removeFan: PropTypes.func.isRequired,
  addPost: PropTypes.func.isRequired,
  removePost: PropTypes.func.isRequired,
}
// posts, 
