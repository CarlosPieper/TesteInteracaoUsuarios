import React, { Component } from 'react';
import Modal from 'react-modal';

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
  constructor() {
    super()
    this.state = {
      isActive: false
    }
  }

  componentWillMount() {
    Modal.setAppElement('body');
  }

  toggleModal = () => {
    this.setState({
      isActive: !this.state.isActive
    })
  }

  render() {
    return (
      <div>
        <li> <a onClick={this.toggleModal} className="btn modal-trigger blue darken-3">+ FORUM</a></li>
        <Modal isOpen={this.state.isActive} onRequestClose={this.toggleModal} style={customStyles}>
          <div>
            <div className="modal-content">
              <h4>Novo Forum</h4>
              <div className="row">
                <form className="col s12">
                  <div className="row">
                    <div className="input-field col s12">
                      <input name="title" type="text" className="validate" />
                      <label class="inputLabel">Título</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="file-field input-field col s12" style={{ marginTop: 0 }}>
                      <div className="waves-effect waves-light btn">
                        <i className="material-icons">add_a_photo</i>
                        <input type="file" accept='image/*' name="profilePic" />
                      </div>
                      <div className="file-path-wrapper" style={{ marginTop: 0 }}>
                        <input className="file-path validate" type="text"
                          placeholder="Foto de Perfil" disabled />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12" style={{ marginTop: 0 }}>
                      <textarea id="textarea1" className="materialize-textarea"></textarea>
                      <label for="textarea1">Texto</label>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="modal-footer">
              <a className="waves-effect waves-light btn red" style={{ width: 200, marginLeft: 20 }}><i className="material-icons right">close</i>CANCELAR</a>
              <a className="waves-effect waves-light btn green" style={{ width: 200, marginLeft: 15 }}><i className="material-icons right">check</i>ENVIAR</a>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
export default NewForum;

