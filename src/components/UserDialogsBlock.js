import React from 'react';
import axios from 'axios'
import { SERVER_URL } from '../fe-constants'
import jwt from 'jsonwebtoken'
import {store} from '../redux/store'
import {setCurrentUser, removeCurrentUser} from '../redux/reducers/userActions'

export class UserDialogsBlock extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.loginInput
    this.passwordInput

    this.state = {
      errorMsg: '',
      showLoginDialog: false, showRegisterDialog: false, isLoggedIn: false
    };
  }

  handleShowLoginDialog() {this.setState({ showLoginDialog: true });}
  
  handleCloseLoginDialog() {this.setState({ showLoginDialog: false, errorMsg: '' });}

  handleShowRegisterDialog() {this.setState({ showRegisterDialog: true });}
  
  handleCloseRegisterDialog() {this.setState({ showRegisterDialog: false, errorMsg: '' });}
  
  async loginSubmitHandler(e){
    e.preventDefault()
    let res = await axios.post(`${SERVER_URL}/user/login`, {
      login: this.loginInput.value,
      password: this.passwordInput.value
    })
    if(res && res.data.hasOwnProperty('error')){
      console.log(res.data); 
      this.setState({errorMsg: res.data.error})      
    } 
    else {
      localStorage.setItem('token', res.data)
      // console.log(res.data, 121, localStorage.getItem('token'))
      console.log(232,'login')
      let userInfo
      let token = localStorage.getItem('token')
      if(token != null) userInfo = jwt.verify(token, 'cryptoSecretKey')
      
      this.setState({isLoggedIn: true, ...userInfo })
      store.dispatch(setCurrentUser(userInfo))
      // this.props.history.push('/posts')
      this.handleCloseLoginDialog()
      this.setState({errorMsg: ''})
    }
  }
  async registerSubmitHandler(e){
    e.preventDefault()
    let res = await axios.post(`${SERVER_URL}/users/register`, {
      login: this.loginRegisterInput.value,
      password: this.passwordRegisterInput.value
    })
    if(res && res.data.hasOwnProperty('error')){
      console.log(res.data); 
      this.setState({errorMsg: res.data.error})      
    } 
    else {
      console.log(123, 'register', res.data)
      this.handleCloseRegisterDialog()
    }
  }
  logout(){
    localStorage.removeItem('token')
    console.log(322, 'logout');
    store.dispatch(removeCurrentUser())
    this.setState({isLoggedIn: false})
  }  
  render() {
    window.onclick = e => {
      if(e.target.className === 'modal')
        this.setState({showLoginDialog: false, showRegisterDialog: false,})
    }

    return (<>
      {this.state.isLoggedIn && <span>Привет, {this.state.login}!</span>}
      {localStorage.getItem('token') ?
        <button className="btn btn-primary" onClick={() => this.logout()} >
          <i className="fa fa-sign-out-alt"></i>
          Выйти
        </button>   
        :
        <>
          <button className="btn btn-primary" 
              onClick={() => this.handleShowLoginDialog()}>
          <i className="fa fa-sign-in-alt"></i>
          Вход
          </button>
        
          <button className="btn btn-primary" 
              onClick={() => this.handleShowRegisterDialog()}>
          <i className="fa fa-user-plus"></i>
            Регистрация
          </button>
        </>
      }

      {this.state.showLoginDialog && <>
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <span onClick={() => this.handleCloseLoginDialog()} className="close">&times;</span>
              <h2>Вход на сайт</h2>
            </div>
            <div className="modal-body">
              <form onSubmit={(e) => this.loginSubmitHandler(e)}>
                <input type="text" placeholder="Ваш логин" ref={node => this.loginInput = node}/>
                <input type="password" placeholder="Ваш пароль" ref={node => this.passwordInput = node } />
              </form>
            </div>
            <div className="modal-footer">
              {this.state.errorMsg != '' && 
                <div>{this.state.errorMsg}</div>
              }
              <input type="submit" className="btn btn-dark" 
                onClick={(e) => this.loginSubmitHandler(e)}
                value='Войти'
              />
            </div>
          </div>
        </div>
      </>}

      {this.state.showRegisterDialog && <>
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <span onClick={() => this.handleCloseRegisterDialog()} className="close">&times;</span>
              <h2>Регистрация на сайте</h2>
            </div>
            <div className="modal-body">
              <form onSubmit={(e) => this.registerSubmitHandler(e)}>
                <input type="text" placeholder="Ваш логин" ref={node => this.loginRegisterInput = node}/>
                <input type="password" placeholder="Ваш пароль" ref={node => this.passwordRegisterInput = node } />
              </form>
            </div>
            <div className="modal-footer">
              {this.state.errorMsg != '' && 
                <div>{this.state.errorMsg}</div>
              }
              <input type="submit" className="btn btn-dark" 
                onClick={(e) => this.registerSubmitHandler(e)}
                value='Зарегистрироваться'
              />
            </div>
          </div>
        </div>
      </>}
    </>);
  }
}
