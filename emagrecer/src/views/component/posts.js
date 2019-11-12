import React, { Component } from 'react';

class Post extends Component {
    render() {
      return (
        <div class="row">
        <div class="col l3">
          </div>
          <div class="col l6 s11">
      <div class="card small forum">
        <a class="text" href="post.html"> 
        <div class="card-image">
          <img src="https://i0.wp.com/www.wallpapermaiden.com/wallpaper/6063/download/1920x1080/nissan-skyline-gt-r-back-view-sport-cars-white.png"/>
          <span class="card-title">Card Title</span>
        </div>
        <div class="card-content">
          <p >I am a very simple card. I am good at containing small bits of information.
            I am convenient because I require little markup to use effectively.</p>
        </div>
      </a>
      </div>
          </div>
      <div  class="col l3"></div>
    </div>
      );
    }
  }
  export default Post;