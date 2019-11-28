import React, { Component } from 'react';
import { getId } from '../services/auth';
import MyNav from './component/navBar';
import MySide from './component/menu/MySide';
import { withRouter } from "react-router-dom";

class FriendRequests extends Component {
    constructor(props) {
        super(props);
        this.state = {
            requests: [{
                requester: null,
                requesterName: null,
                requesterPicture: null,
            }]
        }
    }

    UNSAFE_componentWillMount() {
        setTimeout(() => { this.getFriendRequests(); }, 10);
    }

    getFriendRequests() {
        var self = this;
        let queryString = new URLSearchParams();
        queryString.append("id", getId());
        fetch("https://localhost:5001/FriendsRequest/GetFriendRequests?" + queryString, { headers: { 'Content-Type': 'application/json' } })
            .then(function (response) {
                response.json().then(function (data) {
                    self.setState({ requests: data.requests })
                });
            })
            .catch(function (err) {

            });
    }

    acceptFriendRequest(id) {
        var self = this;
        var formData = new FormData();
        formData.append("idLogged", getId());
        formData.append("id", id);
        const options = {
            method: 'POST',
            body: formData,
        }
        const request = new Request('https://localhost:5001/FriendsRequest/AcceptFriendRequest', options);
        fetch(request).then(function (response) {
            self.getFriendRequests();
        })
            .catch(function (err) {

            });
    }

    denyFriendRequest(id) {
        var self = this;
        var formData = new FormData();
        formData.append("idLogged", getId());
        formData.append("id", id);
        const options = {
            method: 'POST',
            body: formData,
        }
        const request = new Request('https://localhost:5001/FriendsRequest/RemoveFriendRequest', options);
        fetch(request).then(function (response) {
            self.getFriendRequests();
        })
            .catch(function (err) {

            });
    }

    goToProfile(id) {
        this.props.history.push(`/perfil/${id}`);
    }

    render() {
        var self = this;
        if (self.state.requests.length === 0) {
            return (
                <div>
                    <MyNav />
                    <MySide />
                    <div className="row">
                        <div className="col l3"></div>
                        <div className="col l6">
                            <p>Você não possui nenhum pedido de amizade no momento!</p>
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div>
                    <MyNav />
                    <MySide />
                    <div className="row">
                        <div className="col l3">
                        </div>
                        <div className="col l6 s11">
                            {self.state.requests.map(function (request) {
                                if (request.requesterPicture === "" || request.requesterPicture === " ") {
                                    request.requesterPicture = "/images/default.PNG";
                                }
                                return (
                                    <div>
                                        <div className="card small hoverable" style={{ height: 200 }}>
                                            <div className="card-content" onClick={() => self.goToProfile(request.requester)}>
                                                <div key={request.requester}>
                                                    <span>
                                                        <img src={request.requesterPicture} className="circle ImgGp" alt="" style={{ width: 110, height: 90 }} />
                                                    </span>
                                                    <span className="name" style={{ textTransform: "uppercase", marginBottom: 25 }}>
                                                        <strong>{request.requesterName}</strong>
                                                    </span>
                                                    <div className="card-action" style={{ height: 60 }}>
                                                        <span>
                                                            <button className="btn blue darken-3" style={{ marginLeft: 10, marginTop: -5, marginBottom: 5 }} onClick={() => self.acceptFriendRequest(request.requester)}><i className="material-icons left">person_add</i>Aceitar</button>
                                                        </span>
                                                        <span>
                                                            <button className="btn red darken-3" style={{ marginLeft: 10, marginTop: -5, marginBottom: 5 }} onClick={() => self.denyFriendRequest(request.requester)}><i className="material-icons left">cancel</i>Recusar</button>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="col l3"></div>
                    </div>
                </div>
            );
        }
    }
}
export default withRouter(FriendRequests);