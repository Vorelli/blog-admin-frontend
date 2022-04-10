import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import TitleBar from './TitleBar';
import moment from 'moment';

class PostsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: null,
      logInFailed: false
    };
    this.token = localStorage.getItem('token');
    this.loadPosts();
  }

  render() {
    if (this.state.logInFailed) return pug`Redirect(to='/')`;
    else if (!this.state.posts) {
      return pug`
      TitleBar(title="Posts" createHidden=true leftLink="/" leftLinkText= "Home")
      .loading.container Loading...
      `;
    }
    else {
      let title = 'Posts';
      return pug`
        TitleBar(title="Posts" rightBarRightLink='/createPost' rightBarRightText="Create" leftLink="/" leftLinkText= "Home")
        .posts.container
          each post in this.state.posts
            - post.date = moment(post.date).format('YYYY-MM-DD')
            Link(to='/posts/' + post.message_id key=post.message_id)
              .post(className= (post.public ? 'public' : 'nonPublic'))
                .postTitle
                  span= post.title
                .date
                  span= post.date`;
    }
  }

  async loadPosts() {
    if (!this.token) {
      const state = this.state;
      state.logInFailed = true;
      this.setState(state);
      return;
    };
    fetch('https://infinite-taiga-59787.herokuapp.com/backend/posts', {
      mode: 'cors',
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + this.token
      }
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.messages) {
          this.setState({ logInFailed: false, posts: response.messages });
        } else this.state.logInFailed = true;
      });
  }

  async requestToken() {
    const formData = new FormData(document.querySelector('#LogInForm'));
    const that = this;
    fetch('https://infinite-taiga-59787.herokuapp.com/backend/login', {
      mode: 'cors',
      method: 'POST',
      body: formData
    })
      .then((response) => response.json())
      .then(function (response) {
        localStorage.setItem('token', response.token);
        that.setState({ logInSuccessful: true });
      })
      .catch((err) => console.error(err));
  }
}

export default PostsView;
