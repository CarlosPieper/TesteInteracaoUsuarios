import React, { Component } from 'react';
import {Link} from 'react-router-dom';
class MyNav extends Component {
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
            <Link to="/home">
              <div className="brand-logo center"><img src='https://static.wixstatic.com/media/2c60fd_c7d2eff1f7e54db3b998135b85c8a5d7~mv2.png/v1/fit/w_2500,h_1330,al_c/2c60fd_c7d2eff1f7e54db3b998135b85c8a5d7~mv2.png' width="50%"></img></div>

            </Link>

            <ul id="nav-mobile" className="right">
              <li><a href="#" data-activates="friends-out" className="button-collapse "><i class="material-icons right ">recent_actors</i>Amigos</a></li>
              <li><a href="perfil.html" className="button hide-on-med-and-down"><i class="material-icons right">account_circle</i>Perfil</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
export default MyNav;