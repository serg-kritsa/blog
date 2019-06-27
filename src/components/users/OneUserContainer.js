import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {Route, Link} from 'react-router-dom'
import { Container } from 'react-bootstrap';

const OneUserContainer = ({user, posts}) => (
  <section className="container">
    <h1 className="text-primary"> Карточка пользователя </h1>
    <div>
      <h2>{user.name}</h2>
      <div>Электронная почта - {user.email}</div>
      <div>Телефон - {user.phone}</div>
      <div>Адрес: {user.address.suite} - {user.address.street} - {user.address.city}</div>
    </div>
    <div><Link to={'/users'} > К списку пользователей </Link></div>
    <h3> Заметки пользователя: </h3>
    {posts.map((post, i) => {
      return (
        <div className="user-post" key={i} > 
          <div><b>{i+1}.</b> {post.title}</div>
          <div><Link to={'/post/'+post.id}>Перейти к заметке...</Link></div>
        </div>
      )
    })}
  </section>
)

const mapStateToProps = (state, ownProps) => ({
  user: state.users.users.find(user => user.id == ownProps.match.params.id ),
  posts: state.posts.filter(post => post.userId == ownProps.match.params.id ),
})

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OneUserContainer)

// OneUserContainer.propTypes = {
//   posts: PropTypes.arrayOf(PropTypes.shape({
//     id: PropTypes.number.isRequired,
//     title: PropTypes.string.isRequired,
//   }).isRequired).isRequired,
//   user: PropTypes.shape({
//     address: PropTypes.shape({
//       suite: PropTypes.string.isRequired,
//       street: PropTypes.string.isRequired,
//       city: PropTypes.string.isRequired,
//     }).isRequired,
//     name: PropTypes.string.isRequired,
//     email: PropTypes.string.isRequired,
//     phone: PropTypes.string.isRequired,
//   }).isRequired,
// }