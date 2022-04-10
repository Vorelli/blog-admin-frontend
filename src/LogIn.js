import React, { Component } from 'react';

class LogIn extends Component {
  render() {
    return pug`
    form(name='LogInForm' id='LogInForm')
      label(for='username') Email:
      input(type='email' name='username' required)
      label(for='password') Password:
      input(type='password' name='password' required)
      button(type='button' onClick=this.requestToken) Log in`;
  }

  async requestToken() {
    const formData = new FormData(document.querySelector('#LogInForm'));
    fetch('back-end-of-blog.herokuapp.com/backend/login', {
      mode: 'cors',
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((response) => localStorage.setItem('token', response.token));
  }
}

export default LogIn;
