import React, { Component } from 'react';
import { logout } from '../../services/auth';

class MyNav extends Component {
  constructor(props) {
    super(props);
    this.props = props;
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
              <li><a href="#" data-activates="friends-out" className="button-collapse "><i className="material-icons right ">recent_actors</i>Amigos</a></li>
              <li><a href="/perfil" className="button hide-on-med-and-down"><i className="material-icons right">account_circle</i>Perfil</a></li>
              <li><a href="/login" className="button hide-on-med-and-down" onClick={this.logOut}><i className="material-icons right">exit_to_app</i>Sair</a></li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
export default MyNav;