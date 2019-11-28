import React, { Component } from 'react';
import { logout, getId } from '../../services/auth';
import { Link, withRouter } from "react-router-dom";

class MyNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    }
  }
  goToUsers = e => {
    if (e.keyCode === 13) {
      this.props.history.push(`/usuarios/${this.state.name}`)
      if (window.location.href.includes("/usuarios/"))
        window.location.reload();
    }
  }
  logOut() {
    setTimeout(() => { logout(); }, 100);
  }
  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  }
  goToProfile() {
    this.props.history.push(`/perfil/${getId()}`)
    if (window.location.href.includes("/perfil/"))
      window.location.reload();
  }
  render() {
    return (
      <div className="navbar-fixed">
        <nav className="blue darken-3 " >
          <div className="nav-wrapper container ">
            <ul>
              <li className="right">
                <a href="#0" data-toggle="modal" data-target="#myModal" className="button-collapse"><i className="material-icons">menu</i></a>
              </li>
            </ul>
            <ul id="nav-mobile" className="right">
              <li className="center">
                <div className="center">
                  <div className="col s12 ">
                    <div id="topbarsearch">
                      <div className="input-field col  s12 white-text">
                        <i className="material-icons left" style={{ margin: "0px" }}>search</i>
                        <input name="name" type="text" placeholder="Pesquisar" id="autocomplete-input" style={{ width: '80%' }}
                          className="autocomplete white-text" onKeyDown={this.goToUsers} onChange={this.changeHandler} />
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li><Link to={`/mensagens`} className="button hide-on-med-and-down"><i className="material-icons right" title="Chat global">message</i></Link></li>
              <li><Link to={`/solicitacoes`} className="button hide-on-med-and-down"><i className="material-icons right" title="Solicitações de amizade">people</i></Link></li>
              <li><Link to={`/feed`} className="button hide-on-med-and-down"><i className="material-icons right" title="Início">home</i></Link></li>
              <li><a href="#0" onClick={() => { this.goToProfile() }} className="button hide-on-med-and-down"><i className="material-icons right" title="Perfil">account_circle</i></a></li>
              <li><a href="/login" className="button hide-on-med-and-down" onClick={this.logOut}><i className="material-icons right" title="Sair">exit_to_app</i></a></li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
export default withRouter(MyNav);