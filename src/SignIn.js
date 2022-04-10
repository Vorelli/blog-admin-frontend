import React, { Component } from 'react';
import { response } from 'express';

class SignIn extends Component {
  render() {
    return pug`
    form(name='LogInForm' id='LogInForm')
      label(for='email') Email:
      input(type='email' name='email' required)
      label(for='password') Password:
      input(type='password' name='password' required)
      button(type='button' onClick=this.requestToken) Log in`;
  }

  requestToken() {
    const formData = new FormData(document.querySelector('#LogInForm'));
    fetch('back-end-of-blog.herokuapp.com/backend/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData,
      redirect: 'manual',
    }).then((response) => console.log(response));
  }
}
