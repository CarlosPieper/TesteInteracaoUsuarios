import React, { Component } from 'react';
import MyNav from './component/navBar';
import MySide from './component/menu/menu';
import Friends from './component/friends';
import Posts from './component/posts'

class Feed extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <MyNav />
        <MySide />
        <Friends />
        <Posts />
      </div>
    );
  }
}

export default Feed;