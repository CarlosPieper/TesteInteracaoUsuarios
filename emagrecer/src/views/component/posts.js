import React, { Component } from 'react';
import { getId } from '../../services/auth';

class Post extends Component {
  constructor(props) {
    super(props);
    setTimeout(() => { this.getPosts(); }, 1000);

  }

  getPosts() {
    let queryString = new URLSearchParams();
    queryString.append("id", getId());
    fetch('https://localhost:5001/Forum/ListForums?' + queryString, { headers: { 'Content-Type': 'application/json' } })
      .then(function (response) {
        response.json().then(function (data) {
          console.log(data);
        });
      });
  }

  render() {
    return (
      <div className="row">
        <div className="col l3">
        </div>
        <div className="col l6 s11">
          <div className="card small forum">
            <a className="text" href="post.html">
              <div className="card-image">
                <img src="https://i0.wp.com/www.wallpapermaiden.com/wallpaper/6063/download/1920x1080/nissan-skyline-gt-r-back-view-sport-cars-white.png" />
                <span className="card-title">Card Title</span>
              </div>
              <div className="card-content">
                <p >I am a very simple card. I am good at containing small bits of information.
            I am convenient because I require little markup to use effectively.</p>
              </div>
            </a>
          </div>
        </div>
        <div className="col l3"></div>
      </div>
    );
  }
}
export default Post;