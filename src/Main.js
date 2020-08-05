import React, { Component } from 'react';
import { Route, NavLink, HashRouter, Redirect } from 'react-router-dom';
import LogIn from './LogIn.js';
import TryToLogIn from './TryToLogIn';

class Main extends Component {
  render() {
    return pug`
      HashRouter
        div.content
          Route(path='/' component=TryToLogIn)
          Route(path='/log-in' component=LogIn)
    `;
  }
}

export default Main;
