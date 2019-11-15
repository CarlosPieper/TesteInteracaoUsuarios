import React, { Component } from 'react';

class Register extends Component {
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
    this.Register();
  }
  Register() {
    let queryString = new URLSearchParams();
    queryString.append("email", this.formData.email);
    queryString.append("password", this.formData.password);
    fetch("https://localhost:5001/User/Register?" + queryString, { headers: { 'Content-Type': 'application/json' } })
      .then(function (response) {
        response.json().then(function (data) {
          localStorage.setItem('token', data.token);
        });
      })
    if (localStorage.getItem('token') != null && localStorage.getItem('token') != undefined && localStorage.getItem('token') != "") {
      alert("aeho");
    }
    else {
      alert('Credencias incorretas');
    }
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
                  <h4>Entrar</h4>
                  <div className="row">
                    <div className="input-field col s12">
                      <input type="email" name="email" value={email} onChange={this.changeHandler} />
                      <label className="active">E-mail</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <input type="password" name="password" value={password} onChange={this.changeHandler} />
                      <label className="active">Senha</label>
                    </div>
                  </div>
                  <div className="row input-field col s12">
                    <button onClick={this.submitHandler} className="waves-effect waves-light btn" >
                      <i className="material-icons right" >send</i>LOGAR
                    </button>
                  </div>
                  <div className="row">
                    <span>Não possui uma conta ainda? <a href="#">Registre-se agora!</a></span><br />
                    <a href="#passwordRetrieve" className="modal-trigger">
                      Esqueci minha senha
                  </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col s4 offset-s4">
            <div id="passwordRetrieve" className="modal">
              <form className="col s12 white">
                <div className="input-field col s12">
                  <p> INFORME SEU E-MAIL, VOCÊ RECEBERÁ UM CÓDIGO PARA SUBSTITUIR SUA SENHA</p>
                </div>
                <div className="input-field col s12">
                  <input type="email" name="Email" />
                  <label className="active">E-mail</label>
                </div>
              </form>
              <div className="input-field col s12">
                <a className="waves-effect waves-light btn">
                  <i className="material-icons right">send</i>ENVIAR</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Register;