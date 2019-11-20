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
  goToProfile = e => {
    if (e.keyCode === 13) {
      this.props.history.push(`/usuarios/${this.state.name}`)
    }
  }
  logOut() {
    setTimeout(() => { logout(); }, 100);
  }
  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    return (
      <div className="navbar-fixed">
        <nav className="blue darken-3 " >
          <div className="nav-wrapper container ">
            <ul>
              <li className="left">
                <a data-toggle="modal" data-target="#myModal" className="button-collapse"><i className="material-icons">menu</i></a>
              </li>
            </ul>
            <ul id="nav-mobile" className="right">
              <li className="center">
                <div className="center">
                  <div className="col s12 ">
                    <div id="topbarsearch">
                      <div className="input-field col s6 s12 white-text">
                        <i onClick={this.GetUsersByName} className="white-text material-icons prefix">search</i>
                        <input name="name" type="text" placeholder="Pesquisar" id="autocomplete-input"
                          className="autocomplete white-text" onKeyDown={this.goToProfile} onChange={this.changeHandler} />
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li><Link to={`/feed`} className="button hide-on-med-and-down"><i className="material-icons right">home</i>Feed</Link></li>
              <li><Link to={`/perfil/${getId()}`} className="button hide-on-med-and-down" onClick={this.goToProfile}><i className="material-icons right">account_circle</i>Perfil</Link></li>
              <li><a href="/login" className="button hide-on-med-and-down" onClick={this.logOut}><i className="material-icons right">exit_to_app</i>Sair</a></li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
export default withRouter(MyNav);