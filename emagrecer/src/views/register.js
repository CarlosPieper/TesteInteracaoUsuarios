import React, { Component } from 'react';

class Register extends Component {
  constructor(props) {
    super(props);
    this.formData = new FormData();
    this.state = {
      Email: '',
      Password: '',
      Name: '',
      BirthDate: '',
      City: '',
      ConfirmPassword: '',
    }
  }
  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  }
  submitHandler = e => {
    e.preventDefault();
    if (this.state.Password !== this.state.ConfirmPassword) {
      alert("As senhas devem coicidir!")
    }
    else if (!this.state.Email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      alert("Email inválido!")
    }
    else {
      this.formData.append("Email", this.state.Email);
      this.formData.append("Password", this.state.Password);
      this.formData.append("Name", this.state.Name);
      this.formData.append("BirthDate", this.state.BirthDate);
      this.formData.append("City", this.state.City);
      this.Register();
    }
  }
  Register() {
    var self = this;
    const options = {
      method: 'POST',
      body: this.formData,
    }
    const request = new Request('https://localhost:5001/User/Register', options);
    fetch(request).then(function (response) {
      response.json().then(function (data) {
        alert("Cadastrado com sucesso!");
        self.props.history.push("/login");
      })
    }).catch(function (err) {
      alert("Erro ao cadastrar!")
    });
  }
  render() {
    return (
      <div>
        <div className="row">
          <div className="col s6 offset-s3">
            <div className="card large" style={{ height: 700 }}>
              <div className="card-content black-text">
                <form className="col s12 white">
                  <h4 style={{ textAlign: "left" }}>CADASTRE-SE</h4>
                  <div className="row">
                    <div className="input-field col s12">
                      <p style={{ textAlign: "left" }}>JÁ É CADASTRADO? <a href="/login">ENTRE AGORA!</a></p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <input onChange={this.changeHandler} type="text" name="Name" className="form-control" />
                      <label className="inputLabel">NOME</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s6">
                      <input onChange={this.changeHandler} type="password" name="Password" className="form-control" />
                      <label className="inputLabel">SENHA</label>
                    </div>
                    <div className="input-field col s6">
                      <input onChange={this.changeHandler} type="password" name="ConfirmPassword" className="form-control" />
                      <label className="inputLabel">CONFIRMAR SENHA</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <input onChange={this.changeHandler} type="email" name="Email" className="form-control" />
                      <label className="inputLabel">E-MAIL</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s6">
                      <input onChange={this.changeHandler} placeholder=" " type="date" name="BirthDate" className="form-control" />
                      <label className="active">DATA DE NASCIMENTO</label>
                    </div>
                    <div className="input-field col s6">
                      <input onChange={this.changeHandler} type="text" name="City" className="form-control" />
                      <label className="inputLabel">CIDADE (OPCIONAL)</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <div className="input-field col s12">
                        <a href="/login" className="waves-effect waves-light btn" onClick={this.submitHandler} style={{ textAlign: "center", width: 520 }}>
                          <i className="material-icons right">send</i>REGISTRAR</a>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Register;