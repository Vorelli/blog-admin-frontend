import React, { Component } from 'react';
import {
  Route,
  NavLink,
  HashRouter,
  Redirect,
  useLocation,
  Link
} from 'react-router-dom';
import { withRouter } from 'react-router';
import LogIn from './LogIn.js';
import TryToLogIn from './TryToLogIn';
import PostsView from './PostsView';
import PostView from './PostView';
import PostForm from './PostForm';
import PostDelete from './PostDelete';

class Main extends Component {
  constructor(props) {
    super();
    const { match, location, history } = props;
  }

  render() {
    return pug`
    .content
      HashRouter
        Route(exact path='/' component=TryToLogIn)
        Route(path='/log-in' component=LogIn)
        Route(exact path='/createPost' component=PostForm)
        Route(exact path='/posts/:postId' component=PostView)
        Route(path='/posts/:postId/update' component=PostForm)
        Route(path='/posts/:postId/delete' component=PostDelete)
        Route(exact path='/posts' component=PostsView)
    `;
  }
}

export default Main;
