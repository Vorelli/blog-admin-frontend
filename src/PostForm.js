import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import TitleBar from './TitleBar';
import LoadPost from './LoadPost';
import UpdatePost from './UpdatePost';
import CreatePost from './CreatePost';

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titleBar: {
        title: props.match.params.postId ? 'Update Post' : 'Create Post',
        leftLink: '/posts',
        leftLinkText: 'Back'
      },
      post: null,
      tempPostValues: null,
      logInFailure: false,
      post_id: props.match.params.postId,
      currentlyUpdatingOrCreating: false,
      doneUpdating: false,
      errors: [],
      finished: false,
      update: !!props.match.params.postId,
    };
    this.setInitialValues();
  }

  setInitialValues() {
    if (this.state.update) {
      const response = LoadPost(this.state.post_id);
      response.catch((reason) => this.setState({ logInFailure: true }));
      response.then((response) => {
        const prevState = this.state;
        prevState.tempPostValues = response.post;
        setTimeout(this.setState.bind(this, prevState), 1);
      });
    } else {
      const state = this.state;
      state.tempPostValues = {
        title: '',
        body: '',
        public: false
      };
      setTimeout(this.setState.bind(this, state), 1);
    }
  }

  handleChange(type, event) {
    const value = event.target.value;
    const checked = event.target.checked;
    const state = this.state;
    if (type === 'title') state.tempPostValues.title = value;
    else if (type === 'body') state.tempPostValues.body = value;
    else if (type === 'public') state.tempPostValues.public = checked;

    this.setState(state);
  }

  formSubmit() {
    // figure out: are we updating or creating?
    const state = this.state;
    state.currentlyUpdatingOrCreating = true;
    this.setState(state, () => {
      let response;
      switch (this.state.update) {
        case true:
          response = UpdatePost(state.tempPostValues);
          response.then((response) => {
            const state = this.state;
            state.currentlyUpdatingOrCreating = false;
            state.doneUpdating = true;
            this.setState(state);
            this.redirectInFive();
          })
          response.catch((reason) => {
            const state = this.state;
            state.currentlyUpdatingOrCreating = false;
            if (reason.errors) state.errors = reason.errors;
            this.setState(state);
          });
          break;
        case false:
          response = CreatePost(state.tempPostValues);
          response.then(newPostId => {
            const state = this.state;
            state.currentlyUpdatingOrCreating = false;
            state.doneUpdating = true;
            state.post_id = newPostId;
            this.setState(state);
            this.redirectInFive();
          })
          response.catch(reason => {
            const state = this.state;
            state.currentlyUpdatingOrCreating = false;
            if (reason.errors) state.errors = reason.errors;
            this.setState(state);
            return;
          })
      }
    });
  }

  redirectInFive() {
    setTimeout(this.redirect.bind(this), 3000);
  }

  redirect() {
    const state = this.state;
    state.finished = true;
    state.doneUpdating = false;
    this.setState(state);
  }

  render() {
    if (this.state.finished) {
      return pug`Redirect(to='/posts/' + this.state.post_id)`;
    } else if (this.state.currentlyUpdatingOrCreating) {
      return pug`
      TitleBar(title=this.state.titleBar.title leftLink=('/posts/' + this.state.post_id) leftLinkText='Back')
      - const creatingOrUpdating = this.state.update ? 'Updating Your Post...' : 'Creating Your Post...';
      .container.updating= creatingOrUpdating
      `;
    } else if (this.state.doneUpdating) {
      return pug`
      TitleBar(title=this.state.titleBar.title leftLink=('/posts/' + this.state.post_id) leftLinkText='Back')
      - const creatingOrUpdating = this.state.update ? 'Your post has been updated. Redirecting in 3 seconds...' : 'Your post has been created. Redirecting in 3 seconds...'
      .container.updated= creatingOrUpdating`;
    } else if (!this.state.tempPostValues && !this.state.logInFailure && this.state.update) {
      return pug`
      TitleBar(title=this.state.titleBar.title leftLink=('/posts/' + this.state.post_id) leftLinkText='Back')
      .container Loading...`;
    } else if (this.state.logInFailure) {
      return pug`
      Redirect(to='/')`;
    } else {
      return pug`
      - const lLink = this.state.update ? '/posts/' + this.state.post_id : '/posts/'
      TitleBar(title=this.state.titleBar.title leftLink=lLink leftLinkText='Back')
      .container
        form
          .form-group
            label(for='title') Post Title:
            input(type='text' name='title' id='title' placeholder='This is a title' minLength='3' value=this.state.tempPostValues.title onChange=this.handleChange.bind(this,'title')).form-control
          .form-group
            label(for='body') Post Body:
            input(type='textarea' name='body' id='body' placeholder='This is the body...' value = this.state.tempPostValues.body onChange=this.handleChange.bind(this, 'body')).form-control
          .form-group
            label(for='public') Viewable Publicly:
            input(type='checkbox' name='public' id='public' checked=this.state.tempPostValues.public onChange=this.handleChange.bind(this, 'public')).form-control
          - const createOrUpdate = this.state.update ? 'Update' : 'Create';
          button.btn.btn-primary(onClick=this.formSubmit.bind(this))= createOrUpdate
        if(this.state.errors.length)
          ul.errors
            each error in this.state.errors
              li(key=error.msg).error= error.msg
    `;
    }
  }
}

export default PostForm;
