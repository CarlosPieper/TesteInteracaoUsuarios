import React, { Component } from 'react';
import { getId } from '../../services/auth';

class Post extends Component {
  authors="";  
  constructor(props) {
    super(props);
    this.state = {
      posts: [{
          author: null,
          authorName: "",
          id: 0,
          picture: "",
          text: "",
          title: ""
      }],
  }
    setTimeout(() => { this.getPosts(); }, 1000);

  }

  getPosts() {
    var self = this;
    let queryString = new URLSearchParams();
    queryString.append("id", getId());
        fetch("https://localhost:5001/Forum/ListUserForums?" + queryString, { headers: { 'Content-Type': 'application/json' } })
      .then(function (response) {
        response.json().then(function (data) {
          self.setState({ Mp: data.author });
          console.log(self.Mp);
        });
      });
      
  }

  render() {
    var self = this;
    return (
      <div className="row">
        <div className="col l3">
        </div>
        <div className="col l6 s11">
          <div className="card small forum">
            <a className="text" href="post.html">
              <div className="card-image">
                <img  />
                <span className="card-title"></span>
              </div>
              <div className="card-content">
                <p ></p>
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