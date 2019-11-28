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
      text: '',
    }
  }

  UNSAFE_componentWillMount() {
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
        <li> <a href="#0" onClick={this.toggleModal} className="btn modal-trigger blue darken-3">CRIAR FORUM</a></li>
        <Modal isOpen={this.state.isActive} onRequestClose={this.toggleModal} style={customStyles}>

        </Modal>
      </div >
    );
  }
}
export default NewForum;

