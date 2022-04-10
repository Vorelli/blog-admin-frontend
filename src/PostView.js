import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import TitleBar from './TitleBar';
import moment from 'moment';
import LoadPost from './LoadPost';

class PostView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: null,
      logInFailed: false,
      comments: null,
      post_id: props.match.params.postId
    };
    const response = LoadPost(this.state.post_id);
    response.catch((reason) => this.setState({ logInFailed: true }));
    response.then((response) => {
      this.setState({
        logInFailed: false,
        post: response.post,
        comments: response.comments
      });
    });
  }

  showConfirm(event) {
    const confirmPopup = event.currentTarget.querySelector('.confirm');
    confirmPopup.hidden
      ? confirmPopup.removeAttribute('hidden')
      : (confirmPopup.hidden = 'hidden');
  }

  async deleteComment(event) {
    const commentIdToBeDeleted =
      event.currentTarget.attributes.comment_id.value;
    const comment = this.state.comments.find(
      (comment) => comment.comment_id === commentIdToBeDeleted
    );
    let commentIndex = this.state.comments.indexOf(comment);
    comment.body = 'Deleting';
    comment.name = null;
    comment.date = null;
    const state = this.state;
    this.state.comments[commentIndex] = comment;
    this.setState(state);
    const token = await localStorage.getItem('token');
    if (!token) this.setState({ logInFailed: true });
    const response = fetch(
      'https://infinite-taiga-59787.herokuapp.com/backend/comments/' + commentIdToBeDeleted,
      {
        mode: 'cors',
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + token
        }
      }
    )
      .then((response) => response.json())
      .then((response) => {
        if (response.message === 'Comment deleted successfully.') {
          const state = this.state;
          let commentIndex = -1;
          for (let i = 0; i < state.comments.length; i++) {
            if (state.comments[i].comment_id === commentIdToBeDeleted) {
              commentIndex = i;
            }
          }
          state.comments.splice(commentIndex, 1);
          this.setState(state);
        } else {
          this.setState({ logInFailed: true });
        }
      });
  }

  render() {
    const rbrText = 'Update Post';
    const rblText = 'Delete Post';
    if (!this.state.post && !this.state.logInFailed) {
      return pug`
      TitleBar(title="View Post" leftLink="/posts" leftLinkText= "Back"
      rightBarLeftLink='/' rightBarLeftText=rblText
      rightBarRightLink='/' rightBarRightText=rbrText)
      .loading Loading Your Post`;
    } else if (this.state.logInFailed) return pug`Redirect(to='/')`;
    else {
      return pug`
    - const rbrLink = '/posts/' + this.state.post.message_id + '/update';
    - const rbrText = 'Update Post';
    - const rblLink = '/posts/' + this.state.post.message_id + '/delete';
    - const rblText = 'Delete Post';
    TitleBar(title="View Post" leftLink="/posts" leftLinkText= "Back"
    rightBarLeftLink=rblLink rightBarLeftText=rblText rightBarLeftState=this.state
    rightBarRightLink=rbrLink rightBarRightText=rbrText rightBarRightState=this.state)
    - const post = this.state.post
    - post.date = moment(post.date).format('YYYY-MM-DD');
    - const comments = this.state.comments
    .postAndComments.container
      .post
        .postTitleAndDate
          .postPublic.form-group
            label(for='public') Viewable Publicly:
            input(type='checkbox' name='public' id='public' checked=post.public disabled).form-control
          .postTitle
            span= post.title
          .postDate
            span= post.date
        .postBody
          span= post.body
      if(comments.length)
        .commentsTitle Comments
      if(comments.length)
        .comments
          each comment in comments
            - comment.date = !comment.date ? null : moment(comment.date).format('YYYY-MM-DD');
            .comment(key=comment.comment_id)
              .deleteComment(onClick=this.showConfirm)
                button(type='button').btn.btn-danger Delete
                .confirmWrapper
                  .confirm(hidden=true)
                    button(type='button' onClick=this.deleteComment.bind(this) comment_id=comment.comment_id).btn.brn-danger Confirm
              .dateAndName
                .name
                  span= comment.name
                .date
                  span=comment.date
              .dateAndNameExplanation
                if(comment.name)
                  .nameEx
                    span Posted By:
                if(comment.date)
                  .dateEx
                    span Posted On:
              .body
                span=comment.body`;
    }
  }
}

export default PostView;
