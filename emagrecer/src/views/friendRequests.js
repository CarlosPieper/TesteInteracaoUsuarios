import React, { Component } from 'react';
import { getId } from '../services/auth';
import MyNav from './component/navBar';
import MySide from './component/menu/MySide';
class FriendRequests extends Component {
    constructor(props) {
        super(props);
        this.state = {
            requests: [{
                requester: '',
                requesterName: '',
                requesterPicture: '',
            }]
        }
    }
    UNSAFE_componentWillMount() {
        setTimeout(() => { this.getFriendRequests(); }, 100);
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

    render() {
        var self = this;
        if (self.state.requests == undefined || self.state.requests == null) {
            return (
                <div>

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
                                if (request.requesterPicture == "" || request.requesterPicture == " ") {
                                    request.requesterPicture = "/images/default.PNG";
                                }
                                return (
                                    <>
                                        <div className="card small" style={{ height: 200 }}>
                                            <div className="card-content">
                                                <div className="row">

                                                    <div key={request.requester}>
                                                        <div className="col l4">
                                                            <span>
                                                                <img src={request.requesterPicture} className="circle ImgGp" style={{ height: "150px", width: "150px" }} />
                                                            </span>
                                                        </div>
                                                        <div className="col l4"><span className="name">
                                                            <strong style={{textDecoration:'underline'}}>
                                                                {request.requesterName}
                                                            </strong>

                                                        </span> </div>
                                                        <div className="col l4">

                                                            <span>
                                                                <a className="btn blue darken-3" style={{ marginTop: "30px", width: "170px" }} onClick={() => self.acceptFriendRequest(request.requester)}><i className="material-icons left">person_add</i>Aceitar</a>

                                                                <a className="btn red darken-3" style={{ width: "170px" }} onClick={() => self.denyFriendRequest(request.requester)}><i className="material-icons left">cancel</i>Recusar</a>
                                                            </span>
                                                        </div>
                                                    </div>



                                                </div>

                                            </div>
                                        </div>
                                    </>
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
export default FriendRequests;