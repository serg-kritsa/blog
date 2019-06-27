import React from 'react';
import {Link} from 'react-router-dom'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Form, FormControl, Button } from 'react-bootstrap';
import { UserDialogsBlock } from './UserDialogsBlock'
import {store} from '../redux/store'
import {setCurrentUser, removeCurrentUser} from '../redux/reducers/userActions'

export default class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {searchResult: [], showSearchResult: false}
    this.searchInput
  }
  sendPostSearchQuery(e){
    this.setState({
      searchResult: this.props.posts.filter(post => 
        post.title.search(e.target.value) > -1 ),
      showSearchResult: true
    })
  }
  hideSearchResultBlock(){
    if(this.state.searchResult.length == 0){
      this.setState({showSearchResult: false})
      this.searchInput.value = ''
    }
  }

  render() {
    let routes = [
      // { id: 0, url: '/', name: 'Главная' },
      { id: 1, url: '/users', name: 'Пользователи' },
      { id: 2, url: '/posts', name: 'Заметки' },
    ];
    const links = routes.map((elem, i) => {
      return (
        <li key={i}>
          <Link to={elem.url}>{elem.name}</Link>
        </li>
      )
    })
    return (<nav className="navbar bg-dark">
      <div className="navbar-left">
        <Link to="/">
          <i className="fas fa-code"></i>
          JS blog
        </Link>
        <ul>
          {links}
        </ul>
      </div>
      <div className='navbar-right'>
        <UserDialogsBlock/>
      </div>  
    </nav>)
  }
}