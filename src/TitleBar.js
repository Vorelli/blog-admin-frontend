import React from 'react';
import { Link } from 'react-router-dom';

function TitleBar(props) {
  return pug`
    .titleBar.container
      .home
        Link(to = props.leftLink).btn.btn-light= props.leftLinkText
      .title= props.title
      .rightBar
        .rightBarLeft
          if(props.rightBarLeftLink)
            Link(to={pathname: props.rightBarLeftLink ? props.rightBarLeftLink : '/', state: props.rightBarLeftState}).btn.btn-danger= props.rightBarLeftText
        .rightBarRight
          if(props.rightBarRightLink)
            Link(to={pathname: props.rightBarRightLink ? props.rightBarRightLink : '/', state: props.rightBarLeftState}).btn.btn-light= props.rightBarRightText
  `;
}

export default TitleBar;
