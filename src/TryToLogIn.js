import React, { Component } from 'react';

class TryToLogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tryingToLogIn: true,
      logInSuccessful: false
    };
  }

  tryToLogIn() {
    const token = localStorage.getItem('token');
    if (!token) this.setState({ tryingToLogIn: false, logInSuccessful: false });
    else {
      fetch('localhost:3000'); // TODO: Need to request posts and see if token is valid.
    }
  }

  render() {
    if (this.state.tryingToLogIn) {
      tryToLogIn();
      return pug`
      div Loading...`;
    } else if (this.state.logInSuccessful) {
      return pug``;
    } else {
      return pug``;
    }
  }
}

export default TryToLogIn;
