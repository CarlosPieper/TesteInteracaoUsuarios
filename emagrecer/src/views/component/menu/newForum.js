import React, { Component } from 'react';
import Modal from 'react-modal';


const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class NewForum extends Component{
  
  constructor(){
    super()

    this.state={
        isActive: false
    }
}
componentWillMount(){
    Modal.setAppElement('body');
}
toggleModal = () =>{
this.setState({
isActive:!this.state.isActive
})
}  

  render(){
      return(
        <div>
       
<li> <a  onClick={this.toggleModal} className="btn modal-trigger blue darken-3">+ FORUM</a></li>
  
       
        <Modal isOpen={this.state.isActive} onRequestClose={this.toggleModal}  style={customStyles}>
  <div>
      <div className="modal-content">
        <h4>Novo Forum</h4>
        <div className="row">
          <form className="col s12">
            <div className="row">
              <div className="input-field col s6">
                <input id="title" type="text" className="validate"/>
                <label for="title">Titulo</label>
              </div>
              <div className="file-field input-field col s6">
                <div className="btn">
                  <span>File</span>
                  <input type="file"/>
                </div>
                <div className="file-path-wrapper">
                  <input className="file-path validate hide-on-med-and-down" type="text"/>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <textarea id="textarea1" className="materialize-textarea"></textarea>
                <label for="textarea1">Textarea</label>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="modal-footer">
        <a className="waves-effect waves-light btn red" ><i className="material-icons right">close</i>CANCELAR</a>
        <a className="waves-effect waves-light btn green"><i className="material-icons right">check</i>ENVIAR</a>
      </div>
    </div>
   </Modal>
   </div>
      );
    }
  }
  export default NewForum;

