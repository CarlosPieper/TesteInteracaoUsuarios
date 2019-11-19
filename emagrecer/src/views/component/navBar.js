import React, { Component } from 'react';
import { logout, getId } from '../../services/auth';
import { Link } from "react-router-dom";

class MyNav extends Component {
  constructor(props) {
    super(props);
  }

  logOut() {
    setTimeout(() => { logout(); }, 100);
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
                        <i className="white-text material-icons prefix">search</i>
                        <input type="text" placeholder="Pesquisar (aperte enter)" id="autocomplete-input"
                          className="autocomplete white-text" />
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li><Link to={`/perfil/${getId()}`} className="button hide-on-med-and-down" onClick={this.goToProfile}><i className="material-icons right">account_circle</i>Perfil</Link></li>
              <li><a href="/login" className="button hide-on-med-and-down" onClick={this.logOut}><i className="material-icons right">exit_to_app</i>Sair</a></li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
export default MyNav;