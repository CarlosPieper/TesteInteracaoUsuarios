import React, { Component } from 'react';
import Modal from 'react-modal';
import { getId } from '../../../services/auth'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '500px',
  }
};

class NewForum extends Component {
  picture = '';
  constructor() {
    super()
    this.state = {
      isActive: false,
      title: '',

    }
  }

  componentWillMount() {
    Modal.setAppElement('body');
  }

  PostPicture() {
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

  toggleModal = () => {
    this.setState({
      isActive: !this.state.isActive
    })
  }

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  savePicture(e) {
    let files = e.target.files;
    this.picture = files[0];
  }

  PostForum() {
    if (!this.state.title.length > 0) {
      alert("Título é obrigatório!")
    }
    else if (this.state.text.length < 1 || this.state.text === " ") {
      alert("Texto é obrigatório!")
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
          alert("Postado!");
          self.toggleModal();
        })
      }).catch(function (err) {
      });
    }

  }

  render() {
    var self = this;
    return (
      <div>
        <li> <a onClick={this.toggleModal} className="btn modal-trigger blue darken-3">CRIAR FORUM</a></li>
        <Modal isOpen={this.state.isActive} onRequestClose={this.toggleModal} style={customStyles}>
          <div>
            <div className="modal-content">
              <h4>Novo Forum</h4>
              <div className="row">
                <form className="col s12">
                  <div className="row">
                    <div className="input-field col s12">
                      <input name="title" type="text" onChange={this.changeHandler} />
                      <label className="inputLabel">Título</label>
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
                      <textarea name="text" className="materialize-textarea" onChange={this.changeHandler}></textarea>
                      <label className="inputLabel">Texto</label>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="modal-footer">
              <a className="waves-effect waves-light btn red" style={{ width: 200, marginLeft: 20 }}>
                <i className="material-icons right">close</i>CANCELAR</a>
              <a onClick={() => {
                self.PostPicture();
                setTimeout(() => { self.PostForum() })
              }}
                className="waves-effect waves-light btn green" style={{ width: 200, marginLeft: 15 }}>
                <i className="material-icons right">check</i>ENVIAR</a>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
export default NewForum;

