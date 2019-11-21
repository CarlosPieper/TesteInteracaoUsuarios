import React, { Component } from 'react';
import { login, isAuthenticated, setId, getId } from '../services/auth';

class Login extends Component {

  constructor(props) {
    super(props);
    this.formData = new FormData();
    this.formData.email = "";
    this.formData.password = "";
    this.state = {
      email: '',
      password: ''
    }
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
          setId(data.user.id);
          alert(getId())
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
                      <i className="material-icons right">send</i>LOGAR
                    </button>
                  </div>
                  <div className="row">
                    <span>NÃO POSSUI UMA CONTA AINDA? <a href="/cadastro">REGISTRE-SE AGORA!</a></span><br />
                    <a href="#passwordRetrieve" className="modal-trigger">ESQUECI MINHA SENHA</a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="col s4 offset-s4">
          <div id="passwordRetrieve" className="modal">
            <form className="col s12 white">
              <div className="input-field col s12">
                <p> INFORME SEU E-MAIL, VOCÊ RECEBERÁ UM CÓDIGO PARA SUBSTITUIR SUA SENHA</p>
              </div>
              <div className="input-field col s12">
                <input type="email" name="Email" />
                <label className="active">E-MAIL</label>
              </div>
            </form>
            <div className="input-field col s12">
              <a className="waves-effect waves-light btn">
                <i className="material-icons right">send</i>ENVIAR</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;