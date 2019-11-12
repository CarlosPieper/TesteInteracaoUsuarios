import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Login extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col s4 offset-s4">
            <div className="card large">
              <div className="card-content black-text">
                <form formGroup="loginForm" class="col s12 white">
                  <h4>Entrar</h4>
                  <div className="row">
                    <div className="input-field col s12">
                      <input type="email" name="Email" formControlName="Email" className="form-control" />
                      <label for="Email" className="active">E-mail</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <input type="password" name="Password" formControlName="Password" className="form-control" />
                      <label for="Password" class="active">Senha</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <Link to="/home" className="waves-effect waves-light btn" >
                        <i className="material-icons right" >send</i>LOGAR</Link>
                    </div>
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
              <form formGroup="pwdRetrieveForm" className="col s12 white">
                <div className="input-field col s12">
                  <p> INFORME SEU E-MAIL, VOCÊ RECEBERÁ UM CÓDIGO PARA SUBSTITUIR SUA SENHA</p>
                </div>
                <div className="input-field col s12">
                  <input type="email" name="Email" formControlName="Email" className="form-control" />
                  <label for="Email" className="active">E-mail</label>
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
export default Login;