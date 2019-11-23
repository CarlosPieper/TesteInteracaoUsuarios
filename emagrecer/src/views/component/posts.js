import React, { Component } from 'react';
import { getId } from '../../services/auth';
import { withRouter } from "react-router-dom";
class Posts extends Component {
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
          self.setState({ posts: data.forums });
        });
      });

  }
  goToForum(id){
    this.props.history.push(`/post/${id}`)
  }

  render() {
    var self = this;
    return (
      <div className="row">
        <div className="col l3">
        </div>
        <div className="col l6 s11">
          <div className="card small forum">
            {self.state.posts.map(function (post) {
              if (post.picture == "" || post.picture == " ") {
                post.picture = "/images/default.PNG";
              }
              return (
                <div className="card small forum hoverable" key={post.id} onClick={() => (self.goToForum(post.id))}>
                  <a className="text" >
                    <div className="card-image" >
                      <img src={post.picture} />
                    </div>
                    <span style={{ marginLeft: 25 }} className="card-title">{post.title}</span>
                    <div className="card-content">
                      <p>{post.text}</p>
                    </div>
                  </a>
                </div>
              );
            })}
          </div>
        </div>
        <div className="col l3"></div>
      </div>
    );
  }
}
export default withRouter(Posts);