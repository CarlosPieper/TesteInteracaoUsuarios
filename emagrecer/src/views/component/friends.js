import React, { Component } from 'react';
import { getId } from '../../services/auth';
import { withRouter } from "react-router-dom";

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
    setTimeout(() => { this.getUserFriends(); }, 600);
  }


  getUserFriends() {
    var self = this;
    let queryString = new URLSearchParams();
    queryString.append("id", getId());
    fetch("https://localhost:5001/Friends/ListFriends?" + queryString, { headers: { 'Content-Type': 'application/json' } })
      .then(function (response) {
        response.json().then(function (data) {
          self.setState({ friends: data.friends });
          console.log(self.state.friends);
        });
      })
      .catch(function (err) {

        self.setState({ friends: null });
      });
  }

  goToFriendProfile(id) {
    this.props.history.push(`/perfil/${id}`)
    if (window.location.href.includes("/perfil/"))
      window.location.reload();
  }

  render() {
    var self = this;
    if (self.state.friends !== undefined && self.state.friends !== null) {
      return (
        <div>
          <div>
            <ul className="collection avatar hoverable" >
              {self.state.friends.map(function (friend) {
                if (friend.name.length > 20)
                  friend.name = friend.name.substr(0, 18) + "...";
                return (
                  <li className="collection-item hoverable friends" key={friend.id} onClick={() => { self.goToFriendProfile(friend.id) }}>
                    <span><img src={friend.profilePic} className="circle ImgGp" alt="" /> </span>
                    <span className="name">{friend.name}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      );
    } else {
      return (
        <div>

        </div>
      )
    }
  }
}
export default withRouter(Friends);