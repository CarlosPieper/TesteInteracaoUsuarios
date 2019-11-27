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
          //console.log(self.state.users);
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
          <ul className="collection avatar hoverable" >
            {self.state.friends.map(function (friend) {
              return (
                <li className="collection-item hoverable friends" key={friend.id} onClick={() => { self.goToFriendProfile(friend.id) }}>
                  <div className="row">
                    <span><img src={friend.profilePic} className="circle ImgGp" style={{ width: "60px" }} alt="" /></span>
                    <p style={{ fontSize: "16px" }}>{friend.name}</p>
                  </div>
                </li>
              );
            })}
          </ul>
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