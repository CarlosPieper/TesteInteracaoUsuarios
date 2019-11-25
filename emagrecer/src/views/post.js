import React, { Component } from 'react';
import MyNav from './component/navBar';
import MySide from './component/menu/MySide';
class Post extends Component {
    constructor(props) {
        super(props);
        const { match: { params } } = this.props;
        this.id = params.id;
        this.state = {
            post: {
                author: null,
                authorName: "",
                id: 0,
                picture: "",
                text: "",
                title: ""
            },
            comments: [{
                id: 0,
                forum: 0,
                author: 0,
                text: '',
                authorName: '',
            }],
        }
    }
    componentWillMount() {
        setTimeout(() => { this.getPost() }, 100);
    }
    getPost() {
        var self = this;
        let queryString = new URLSearchParams();
        queryString.append("id", this.id);
        fetch("https://localhost:5001/Forum/SearchById?" + queryString, { headers: { 'Content-Type': 'application/json' } })
            .then(function (response) {
                response.json().then(function (data) {
                    self.setState({ post: data.forum });
                    console.log(self.state.forum);
                    self.getComments();
                });
            })
            .catch(function (err) {
                
            });
    }
    getComments() {
        var self = this;
        let queryString = new URLSearchParams();
        queryString.append("forum", this.id);
        fetch("https://localhost:5001/ForumComments/ListForumComments?" + queryString, { headers: { 'Content-Type': 'application/json' } })
            .then(function (response) {
                response.json().then(function (data) {
                    self.setState({ comments: data.forumcomments });
                });
            })
            .catch(function (err) {
                
            });
    }
    render() {
        var self = this;
        if (this.state.post.picture == "" || this.state.post.picture == " ")
            this.state.post.picture = "/images/default.PNG";
        return (
            <div>
                <MyNav />
                <MySide />
                <div className="row">
                    <div className="col l3"></div>
                    <div className="col l8 s9">
                        <div className="card medium card forum">
                            <div className="card-image">
                                <img src={self.state.post.picture} />
                            </div>
                            <div className="card-title" style={{ marginLeft: 25 }}>
                                <span>{self.state.post.title}</span>
                            </div>
                            <div className="card-content">
                                <p >{self.state.post.text}</p>
                            </div>
                            <div className="card-action" >
                            </div>
                        </div>
                    </div>
                    <div className="col l3"></div>
                </div>
                <div className="row"></div>
            </div>
        );
    }
}
export default Post;