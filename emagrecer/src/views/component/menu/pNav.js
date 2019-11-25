import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getId } from '../../../services/auth';

class Pnav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        birthDate: "",
        city: "",
        coverPic: "",
        cpf: "",
        description: "",
        email: "",
        genre: "",
        id: "",
        name: "",
        profilePic: "",
        registrationDate: "",
      },
    }
    setTimeout(() => { this.GetUser(); }, 500);

  }

  GetUser() {
    var self = this;
    let queryString = new URLSearchParams();
    queryString.append("id", getId());
    queryString.append("idLogged", getId());
    fetch("https://localhost:5001/User/GetUserData?" + queryString, { headers: { 'Content-Type': 'application/json' } })
      .then(function (response) {
        response.json().then(function (data) {
          self.setState({ user: data.user });
        });
      })
      .catch(function (err) {
        alert("Erro!");
        self.setState({ user: null });
      });
  }

  render() {
    return (
      <Link to={`/perfil/${getId()}`}>
        <li>
          <div className="user-view" >
            <div className="background">
              <img src={this.state.user.coverPic} width="100%" height="100%" />
            </div>
            <img className="circle" src={this.state.user.profilePic} />
            <span className="white-text">{this.state.user.name}</span>
            <span className="white-text email">{this.state.user.email}</span>
          </div>
        </li>

      </Link>
    );
  }
}

export default Pnav;