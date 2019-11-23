import React, { Component } from 'react';
import { getId } from '../services/auth';
import MyNav from './component/navBar';
import MySide from './component/menu/MySide';
class Solicitations extends Component {
    constructor(props) {
        super(props);
    }
    UNSAFE_componentWillMount() {
        this.getSolicitationss();
    }
    getSolicitationss() {
        var self = this;
        let queryString = new URLSearchParams();
        queryString.append("id", getId());
        fetch("https://localhost:5001/FriendsRequest/GetSolicitations?" + queryString, { headers: { 'Content-Type': 'application/json' } })
            .then(function (response) {
                response.json().then(function (data) {
                    console.log(data.requests);
                });
            })
            .catch(function (err) {
                alert("Erro!");
            });
    }
    render() {
        return (
            <div>
                <MyNav />
                <MySide />
            </div>
        );
    }
}
export default Solicitations;