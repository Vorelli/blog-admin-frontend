import React, { Component } from 'react';

class TryToLogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tryingToLogIn: true,
      logInSuccessful: false,
    };
    this.tryToLogIn();
  }

  tryToLogIn() {
    const token = localStorage.getItem('token');
    if (!token) this.setState({ tryingToLogIn: false, logInSuccessful: false });
    else {
      fetch('http://back-end-of-blog.herokuapp.com/backend').catch((err) => {
        console.log(err);
        this.setState({ tryingToLogIn: false, logInSuccessful: false });
      }); // TODO: Need to request posts and see if token is valid.
    }
  }

  render() {
    if (this.state.tryingToLogIn) {
      return <div>Loading...</div>;
    } else if (this.state.logInSuccessful) {
      return <></>;
    } else {
      return <div>Log in failed</div>;
    }
  }
}

export default TryToLogIn;
