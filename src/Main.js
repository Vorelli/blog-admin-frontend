import React, { Component } from 'react';
import { Route, NavLink, HashRouter, Redirect } from 'react-router-dom';
import LogIn from './LogIn.js';
import TryToLogIn from './TryToLogIn';

class Main extends Component {
  render() {
    return (
      <HashRouter>
        <div className='content'>
          <Route path='/' component={TryToLogIn} />
          <Route path='/login' component={LogIn} />
        </div>
      </HashRouter>
    );
  }
}

export default Main;
