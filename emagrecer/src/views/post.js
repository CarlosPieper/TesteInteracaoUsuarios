import React, { Component } from 'react';
import MyNav from './component/navBar';
import MySide from './component/menu/MySide';
import { withRouter } from "react-router-dom";
import { getId } from '../services/auth';

class Post extends Component {
    constructor(props) {
        super(props);
        const { match: { params } } = this.props;
        this.id = params.id;
        this.state = {
            text: '',
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
    UNSAFE_componentWillMount() {
        setTimeout(() => { this.getPost() }, 10);
        setTimeout(() => { this.getComments() }, 100);
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
                    self.setState({ comments: data.forumComments });
                });
            })
            .catch(function (err) { });
    }

    goToProfile(id) {
        this.props.history.push(`/perfil/${id}`)
    }

    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    clearFields = e => {
        e.preventDefault();
        this.setState({ text: "" });
    }

    submitHandler = e => {
        e.preventDefault();
        setTimeout(() => { this.postComment(e) }, 100);
    }

    postComment = e => {
        if (this.state.text.length < 1 || this.state.text === " ") {
            alert("Texto é obrigatório!")
        }
        else {
            var formData = new FormData();
            formData.append("Forum", this.state.post.id);
            formData.append("Text", this.state.text);
            formData.append("Author", getId());
            var self = this;
            const options = {
                method: 'POST',
                body: formData,
            }
            const request = new Request('https://localhost:5001/Forum/Include', options);
            fetch(request).then(function (response) {
                response.json().then(function (data) {
                    self.getPosts();
                })
            }).catch(function (err) {
            });
        }
    }

    render() {
        var self = this;
        if (this.state.post.picture === "" || this.state.post.picture === " ")
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
                                <img src={self.state.post.picture} alt="" />
                            </div>
                            <div className="card-title" style={{ marginLeft: 25 }}>
                                <span>{self.state.post.title}</span>
                            </div>
                            <div className="card-content">
                                <p >{self.state.post.text}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col l3"></div>
                </div>
                <div className="row">
                    <div className="col l3 center"></div>
                    <div className="col l6 s11">
                        <div className="card mediu forum" style={{ marginLeft: 150, marginRight: -50 }}>
                            <div className="card-content">
                                <div className="card-title" style={{ fontSize: 18 }}><strong>ADICIONAR COMENTÁRIO</strong></div>
                                <div className="row">
                                    <div className="input-field col s12" style={{ marginTop: 0 }}>
                                        <textarea name="text" id="text2" className="materialize-textarea" value={this.state.text} onChange={this.changeHandler}></textarea>
                                        <label className="inputLabel">Texto</label>
                                    </div>
                                </div>
                            </div>
                            <div className="card-action" style={{ marginTop: 0 }}>
                                <button className="waves-effect waves-light btn red" style={{ width: 200, marginLeft: 20 }}
                                    onClick={(e) => this.clearFields(e)}>
                                    <i className="material-icons right">close</i>CANCELAR</button>
                                <button className="waves-effect waves-light btn green" style={{ width: 200, marginLeft: 15 }}
                                    onClick={(e) => { this.submitHandler(e) }}>
                                    <i className="material-icons right">check</i>ENVIAR</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col l3 center">
                    </div>
                    <div className="col l6 s11">
                        {self.state.comments.map(function (comment) {
                            return (
                                <div className="card small forum" key={comment.id} style={{ height: 200, marginLeft: 150, marginRight: -50 }}>
                                    <div className="card-content">
                                        <div className="row">
                                            <div className="col l10">
                                                <div className="card-title authorname" style={{ marginLeft: 5 }} onClick={() => { self.goToProfile(comment.author) }}>{comment.authorName}</div>
                                                <div className="card-content authorname" style={{ marginTop: -10, marginLeft: -20, fontSize: 14 }}><strong>{comment.text}</strong></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="col l3"></div>
                </div>
            </div>
        );
    }
}
export default withRouter(Post);