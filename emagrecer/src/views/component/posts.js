import React, { Component } from 'react';
import { getId } from '../../services/auth';
import { withRouter } from "react-router-dom";

class Posts extends Component {
  picture = '';
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      text: '',
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

  PostPicture = e => {
    var formData = new FormData();
    formData.append(this.picture.name, this.picture);
    const options = {
      method: 'POST',
      body: formData,
    }
    const request = new Request('https://localhost:5001/Forum/ImagePost', options);
    fetch(request).then(function (response) {
    });
  }

  savePicture(e) {
    let files = e.target.files;
    this.picture = files[0];
  }

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  PostForum = e => {
    if (!this.state.title.length > 0) {
      alert("Título é obrigatório!")
    }
    else if (this.state.title.length > 50) {
      alert("O máximo de caracteres para o título é 50!");
    }
    else if (this.state.text.length < 1 || this.state.text === " ") {
      alert("Texto é obrigatório!")
    }
    else if (this.state.text.length > 300) {
      alert("O máximo de caracteres para o texto é 300!");
    }
    else {
      var formData = new FormData();
      formData.append("Title", this.state.title);
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

  clearFields = e => {
    e.preventDefault();
    this.setState({ title: "" });
    this.setState({ text: "" });
    this.picture = null;
  }

  submitHandler = e => {
    e.preventDefault();
    setTimeout(() => { this.PostPicture(e) }, 10);
    setTimeout(() => { this.PostForum(e) }, 300);
  }

  render() {
    var self = this;
    return (
      <div>
        <div className="row">
          <div className="col l3"></div>
          <div className="col l6 s11">
            <div className="card large forum" style={{ height: 465 }}>
              <div className="card-content">
                <h4 style={{ marginTop: 0 }}>Novo Fórum</h4>
                <div className="row">
                  <form className="col s12">
                    <div className="row">
                      <div className="input-field col s12">
                        <input name="title" id="title" type="text" data-length="50" onChange={this.changeHandler} value={self.state.title} />
                        <label className="inputLabel">Título (máximo 50 caracteres)</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="file-field input-field col s12" style={{ marginTop: 0 }}>
                        <div className="waves-effect waves-light btn">
                          <i className="material-icons">add_a_photo</i>
                          <input type="file" accept='image/*' name="picture" onChange={(e) => self.savePicture(e)} />
                        </div>
                        <div className="file-path-wrapper" style={{ marginTop: 0 }}>
                          <input className="file-path validate" type="text"
                            placeholder="Imagem" defaultValue={self.state.picture} disabled />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12" style={{ marginTop: 0 }}>
                        <textarea name="text" id="text" className="materialize-textarea" data-length="300" onChange={this.changeHandler} value={self.state.text}></textarea>
                        <label className="inputLabel">Texto (máximo 300 caracteres)</label>
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
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        {self.posts()}
      </div>
    );
  }
  posts() {
    var self = this;
    if (this.state.posts.length < 1) {
      return (
        <div>
        </div>
      );
    } else {
      return (
        <div className="row">
          <div className="col l3">
          </div>
          <div className="col l6 s11">
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
                      <div className="col l10">
                        <div className="card-title" style={{ marginLeft: 5 }}>{post.authorName}</div>
                        <div className="card-content authorname" style={{ marginTop: -10, marginLeft: -20, fontSize: 14 }}><strong>{post.title}</strong></div>
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
          <div className="col l3"></div>
        </div>
      );
    }
  }
}



export default withRouter(Posts);