import React from 'react';
import {Switch, Route} from 'react-router-dom'
import Home from './Home';
import AllPostsContainer from './posts/AllPostsContainer'
import OnePostContainer from './posts/OnePostContainer'
import AllUsersContainer from './users/AllUsersContainer'
import OneUserContainer from './users/OneUserContainer'
import Header from './Header';
import E404 from './errors/404';

class App extends React.Component {
  render() {
    // console.log('render');
    return (
      <>
      <Header/>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/users" component={AllUsersContainer}/>
        <Route exact path="/user/:id" component={OneUserContainer}/>
        <Route exact path="/posts" component={AllPostsContainer}/>
        <Route exact path="/post/:id" component={OnePostContainer}/>
        <Route component={E404}/>
      </Switch>
      </>
    );
  }
}
export default App