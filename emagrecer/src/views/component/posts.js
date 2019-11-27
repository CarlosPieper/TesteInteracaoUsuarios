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
        title: "",
        authorPic: "",
      }],
    }
    setTimeout(() => { this.getPosts(); }, 50);

  }

  getPosts() {
    var self = this;
    let queryString = new URLSearchParams();
    queryString.append("id", getId());
    fetch("https://localhost:5001/Forum/ListForums?" + queryString, { headers: { 'Content-Type': 'application/json' } })
      .then(function (response) {
        response.json().then(function (data) {
          self.setState({ posts: data.forums });
        });
      });
  }

  goToForum(id) {
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
              if (post.picture === "" || post.picture === " ") {
                post.picture = "/images/default.PNG";
              }
              if (post.authorPic === "" || post.authorPic === " ") {
                post.authorPic = "/images/default.PNG";
              }
              return (
                <div className="card small forum hoverable" key={post.id} onClick={() => (self.goToForum(post.id))}>
                  <div className="card-image" >
                    <img alt="" src={post.picture} />
                  </div>
                  <div className="card-content">
                    <div className="row">
                      <div className="col l7">
                        <div className="car-title" style={{ marginLeft: 5 }}>{post.authorName}</div>
                        <div className="card-content authorname" style={{ marginTop: -10, marginLeft: -20, fontSize: 18 }}><strong>{post.title}</strong></div>
                      </div>
                      <div className="col l3">
                      </div>
                      <div className="col l1">
                        <img src={post.authorPic} style={{ width: '70px', height: '60px', borderRadius: '50px' }} alt="" />
                      </div>
                    </div>
                  </div>
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