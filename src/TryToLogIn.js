import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import TitleBar from './TitleBar';
import moment from 'moment';

class TryToLogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tryingToLogIn: true,
      logInSuccessful: false
    };
    setTimeout(this.tryToLogIn.bind(this), 100);
  }

  async tryToLogIn() {
    const token = localStorage.getItem('token');
    if (!token) this.setState({ tryingToLogIn: false, logInSuccessful: false });
    else {
      fetch('https://infinite-taiga-59787.herokuapp.com/backend/check', {
        mode: 'cors',
        headers: { Authorization: 'Bearer ' + token },
        method: 'GET'
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.message && response.message === 'You are logged in!') {
            this.setState({ tryingToLogIn: false, logInSuccessful: true });
          } else {
            this.setState({ tryingToLogIn: false, logInSuccessful: false });
          }
        })
        .catch((err) => console.error(err)); // TODO: Need to request posts and see if token is valid.
    }
  }

  render() {
    if (this.state.tryingToLogIn) {
      return pug`
      TitleBar(title="Posts" createHidden=true)
      .container.loading Loading...`;
    } else if (this.state.logInSuccessful) {
      return pug`Redirect(to='/posts')`;
    } else {
      return pug`Redirect(to='/log-in')`;
    }
  }
}

export default TryToLogIn;
