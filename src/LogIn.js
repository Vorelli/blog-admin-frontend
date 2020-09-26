import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logInSuccessful: false,
      errors: null
    };
  }

  render() {
    if (this.state.logInSuccessful) return pug`Redirect(to='/posts')`;
    return pug`
    .container
      form(name='LogInForm' id='LogInForm' onSubmit=this.requestToken.bind(this))
        .form-group
          label(for='username') Email:
          input(type='email' name='username' required).form-control
        .form-group
          label(for='password') Password:
          input(type='password' name='password' required).form-control
        button(type='submit').btn.btn-primary Log in
      if this.state.errors
        ul.errors
          each error in this.state.errors
            li(key = error.msg)= error.msg`;
  }

  async requestToken(event) {
    event.preventDefault();
    const formData = new FormData(document.querySelector('#LogInForm'));
    fetch('https://infinite-taiga-59787.herokuapp.com/backend/login', {
      mode: 'cors',
      method: 'POST',
      body: formData
    })
      .then((response) => response.json())
      .then(function (response) {
        if (response.message == 'Something is not right') {
          throw response.errors;
        }
        localStorage.setItem('token', response.token);
        this.setState({ logInSuccessful: true });
      }.bind(this))
      .catch((errors) => { const state = this.state; state.errors = errors; this.setState(state); });
  }
}

export default LogIn;
