import React, { Component } from 'react';
import { login, isAuthenticated, setId } from '../services/auth';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -45%)',
    height: '350px',
    overlfow: 'scroll'

  },
};
class Login extends Component {
  hubConnection;
  constructor(props) {
    super(props);
    this.formData = new FormData();
    this.formData.email = "";
    this.formData.password = "";
    this.state = {
      email: '',
      password: '',
      emailRecovery: '',
    }
  }
  UNSAFE_componentWillMount() {
    Modal.setAppElement('body');
  }
  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  }
  submitHandler = e => {
    e.preventDefault();
    this.formData = this.state;
    if (this.formData.email === undefined || this.formData.email === null || this.formData.email === "")
      alert("Insira um email!")
    else if (this.formData.password === undefined || this.formData.password === null || this.formData.password === "")
      alert("Insira uma senha!")
    else
      this.Login();
  }
  Login() {
    var self = this;
    let queryString = new URLSearchParams();
    queryString.append("email", this.formData.email);
    queryString.append("password", this.formData.password);
    fetch("https://localhost:5001/User/Login?" + queryString, { headers: { 'Content-Type': 'application/json' } })
      .then(function (response) {
        response.json().then(function (data) {
          login(data.token);
          if (data.user !== undefined)
            setId(data.user.id);
          if (isAuthenticated()) {
            self.props.history.push("/feed");
          }
          else {
            alert('Credencias incorretas');
          }
        });
      })
      .catch(function (err) {
        alert("Erro!");
      });
  }

  toggleModal = (e) => {
    e.preventDefault();
    this.setState({
      isActive: !this.state.isActive
    })
  }

  SendPassword() {
    let queryString = new URLSearchParams();
    queryString.append("email", this.state.emailRecovery);
    fetch("https://localhost:5001/User/RecoverPassword?" + queryString, { headers: { 'Content-Type': 'application/json' } })
      .then(function (response) {
        alert("E-mail enviado! Entre no seu e-mail para ver seu código de acesso!");
      })
      .catch(function (err) {
        alert("Erro!");
      });
  }

  render() {
    const { email, password } = this.state;
    return (
      <div>
        <div className="row">
          <div className="col s4 offset-s4">
            <div className="card large">
              <div className="card-content black-text">
                <form className="col s12 white">
                  <h4>ENTRAR</h4>
                  <div className="row">
                    <div className="input-field col s12">
                      <input type="email" name="email" value={email} onChange={this.changeHandler} />
                      <label className="active">E-MAIL</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <input type="password" name="password" value={password} onChange={this.changeHandler} />
                      <label className="active">SENHA</label>
                    </div>
                  </div>
                  <div className="row input-field col s12">
                    <button onClick={this.submitHandler} className="waves-effect waves-light btn" style={{ width: 330 }}>
                      <i className="material-icons right">send</i>LOGAR</button>
                  </div>
                  <div className="row">
                    <span>NÃO POSSUI UMA CONTA AINDA? <a href="/cadastro">REGISTRE-SE AGORA!</a></span></div>
                  <div className="row col s12">
                    <button onClick={this.toggleModal} className="waves-effect waves-light btn" style={{ width: 330 }}>ESQUECI MINHA SENHA</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Modal isOpen={this.state.isActive} style={customStyles}>
            <div>
              <div className="modal-content">
                <div className="row">
                  <form className="col s12">
                    <h5 style={{ backgroundColor: 'white', color: 'black' }}>RECUPERAÇÃO DE SENHA</h5>
                    <div className="row">
                      <div className="input-field col s12">
                        <p> INFORME SEU E-MAIL, VOCÊ RECEBERÁ UM CÓDIGO PARA SUBSTITUIR SUA SENHA</p>
                      </div>
                      <div className="input-field col s12">
                        <input type="email" name="emailRecovery" onChange={this.changeHandler} />
                        <label className="inputLabel">E-mail</label>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="modal-footer">
                <div className="row col s12">
                  <button className="waves-effect waves-light btn red" onClick={this.toggleModal} style={{ width: 250, marginRight: 5 }}><i className="material-icons right">close</i>CANCELAR</button>
                  <button className="waves-effect waves-light btn green" onClick={() => { this.SendPassword() }} style={{ width: 250, marginLeft: 5 }}><i className="material-icons right">check</i>ENVIAR</button>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    );
  }
}
export default Login;