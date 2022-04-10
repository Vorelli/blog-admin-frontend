import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import LoadPost from './LoadPost';
import TitleBar from './TitleBar';

class PostDelete extends Component {
  constructor(props) {
    super(props);
    const post_id = props.match.params.postId;
    this.state = {
      post: null,
      logInFailed: false,
      comments: null,
      post_id,
      titleBar: {
        title: 'Delete Post',
        leftLink: '/posts/' + post_id,
        leftText: 'Back'
      },
      token: localStorage.getItem('token'),
      awaitingRedirect: false
    };

    const postAndCommentsResponse = LoadPost(this.state.post_id);
    postAndCommentsResponse.then((postAndCommentsResponse) => {
      this.setState({
        post: postAndCommentsResponse.post,
        comments: postAndCommentsResponse.comments
      });
    });
    postAndCommentsResponse.catch((reason) => {
      this.setState({ logInFailed: true });
    });
  }

  deletePost() {
    const response = fetch(
      'https://infinite-taiga-59787.herokuapp.com/backend/posts/' + this.state.post_id,
      {
        mode: 'cors',
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + this.state.token
        }
      }
    );

    response
      .then((response) => response.json())
      .then((response) => {
        this.setState({ awaitingRedirect: true });
        setTimeout(this.redirect.bind(this), 2500);
      })
      .catch((reason) => {
        this.setState({ logInFailed: true });
      });
  }

  redirect() {
    this.setState({ logInFailed: true });
  }

  render() {
    if (this.state.logInFailed) {
      return pug`Redirect(to='/posts')`;
    } else if (this.state.awaitingRedirect) {
      return pug`
      TitleBar(title=this.state.titleBar.title leftLink=this.state.titleBar.leftLink, leftLinkText=this.state.titleBar.leftText)
      .container Post deleted successfully! Redirecting in 3 seconds...`;
    } else if (!this.state.post) {
      return pug`
      TitleBar(title=this.state.titleBar.title, leftLink=this.state.titleBar.leftLink, leftLinkText=this.state.titleBar.leftText)
      .container Loading...`;
    } else {
      return pug`
        TitleBar(title = this.state.titleBar.title, leftLink = this.state.titleBar.leftLink, leftLinkText = this.state.titleBar.leftText)
        .container.content.postToBeDeleted
          p Are you sure you want to delete this post which has ${this.state.comments.length} #{this.state.comments.length==1 ? 'comment' : 'comments'}?
          p.postTitle ${this.state.post.title}
          p Deletion is permanent. You can always hide from the public.
          button(type='button' onClick=this.deletePost.bind(this)).btn.btn-danger Delete`;
    }
  }
}

export default PostDelete;
