import React, { Component } from 'react';
import { getId } from '../../services/auth';
class Friends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: [{
        birthDate: "",
        city: "",
        coverPic: "",
        cpf: "",
        description: "",
        email: "",
        genre: "",
        id: "",
        name: "",
        password: "",
        profilePic: "",
        registrationDate: "",
      }]
    }
    setTimeout(() => { this.getUserFriends(); }, 100);
  }
  getUserFriends() {
    var self = this;
    let queryString = new URLSearchParams();
    queryString.append("id", getId());
    fetch("https://localhost:5001/User/ListFriends?" + queryString, { headers: { 'Content-Type': 'application/json' } })
      .then(function (response) {
        response.json().then(function (data) {
          self.setState({ friends: data.friends });
          //console.log(self.state.users);
        });
      })
      .catch(function (err) {
        alert("Erro!");
        self.setState({ friends: null });
      });
  }
  render() {
    return (
      <div className="row">
        <div className="col l3">
        </div>
        <div className="col l6 s11">
        </div>
        <div className="col l3 hide-on-med-and-down amigos"  >
          <ul className="collection "  >
            <li className="collection-item">
              <h4 className="amg">AMIGOS</h4>
            </li>
            <li className="collection-item avatar">
              <img src="user.png" className="circle" />
              <span className="name">Nando</span>
            </li>
            <li className="collection-item avatar">
              <img src="user.png" className="circle" />
              <span className="name">Nando</span>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
export default Friends;