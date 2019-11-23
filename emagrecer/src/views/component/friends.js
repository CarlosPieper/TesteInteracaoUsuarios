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
    fetch("https://localhost:5001/Friends/ListFriends?" + queryString, { headers: { 'Content-Type': 'application/json' } })
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
      <div>
        <div>
          <ul className="collection  avatar"  >
            <li className="collection-item ">
              <img src="user.png" className="circle ImgGp" />
              <span className="title">Nando</span>
            </li>
          </ul>
        </div>
        <div>
          <ul className="collection  avatar"  >
            <li className="collection-item ">
              <img src="user.png" className="circle ImgGp" />
              <span className="title">Nando</span>
            </li>
          </ul>
        </div>
        <div>
          <ul className="collection  avatar"  >
            <li className="collection-item ">
              <img src="user.png" className="circle ImgGp" />
              <span className="title">Nando</span>
            </li>
          </ul>
        </div>
        <div>
          <ul className="collection  avatar"  >
            <li className="collection-item ">
              <img src="user.png" className="circle ImgGp" />
              <span className="title">Nando</span>
            </li>
          </ul>
        </div>
        <div>
          <ul className="collection  avatar"  >
            <li className="collection-item ">
              <img src="user.png" className="circle ImgGp" />
              <span className="title">Nando</span>
            </li>
          </ul>
        </div>
        <div>
          <ul className="collection  avatar"  >
            <li className="collection-item ">
              <img src="user.png" className="circle ImgGp" />
              <span className="title">Nando</span>
            </li>
          </ul>
        </div>
        <div>
          <ul className="collection  avatar"  >
            <li className="collection-item ">
              <img src="user.png" className="circle ImgGp" />
              <span className="title">Nando</span>
            </li>
          </ul>
        </div>
        <div>
          <ul className="collection  avatar"  >
            <li className="collection-item ">
              <img src="user.png" className="circle ImgGp" />
              <span className="title">Nando</span>
            </li>
          </ul>
        </div>
        <div>
          <ul className="collection  avatar"  >
            <li className="collection-item ">
              <img src="user.png" className="circle ImgGp" />
              <span className="title">Nando</span>
            </li>
          </ul>
        </div>
        <div>
          <ul className="collection  avatar"  >
            <li className="collection-item ">
              <img src="user.png" className="circle ImgGp" />
              <span className="title">Nando</span>
            </li>
          </ul>
        </div>
        <div>
          <ul className="collection  avatar"  >
            <li className="collection-item ">
              <img src="user.png" className="circle ImgGp" />
              <span className="title">Nando</span>
            </li>
          </ul>
        </div>
        <div>
          <ul className="collection  avatar"  >
            <li className="collection-item ">
              <img src="user.png" className="circle ImgGp" />
              <span className="title">Nando</span>
            </li>
          </ul>
        </div>
        <div>
          <ul className="collection  avatar"  >
            <li className="collection-item ">
              <img src="user.png" className="circle ImgGp" />
              <span className="title">Nando</span>
            </li>
          </ul>
        </div>
        <div>
          <ul className="collection  avatar"  >
            <li className="collection-item ">
              <img src="user.png" className="circle ImgGp" />
              <span className="title">Nando</span>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
export default Friends;