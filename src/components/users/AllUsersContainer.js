import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {Route, Link} from 'react-router-dom'

const AllUsersContainer = ({users, current}) => (  
  <section className="container">
    <h1 className="text-primary">Список пользователей</h1>
    {users.map((user, i) => {
      return (
        <div className="user" key={i}>
            {current ? <b>{user.login}</b> : <span>Пользователь</span>}
            {current && <Link to={'/user/'+user.id} > Подробнее...</Link>}
        </div>
      )
    })}
  </section>
)

const mapStateToProps = state => ({
  users: state.users.users,
  current: state.users.current,
})

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllUsersContainer)