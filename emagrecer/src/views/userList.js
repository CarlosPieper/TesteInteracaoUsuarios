import React, { Component } from 'react';
import MyNav from './component/navBar';
import MySide from './component/menu/MySide';
import { withRouter } from "react-router-dom";

class UserList extends Component {
    name;
    constructor(props) {
        super(props);
        const { match: { params } } = this.props;
        this.name = params.name;
        this.state = {
            users: [{
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
    }
    UNSAFE_componentWillMount() {
        setTimeout(() => { this.GetUsersByName(); }, 500);
    }
    GetUsersByName() {
        var self = this;
        let queryString = new URLSearchParams();
        queryString.append("name", this.name);
        fetch("https://localhost:5001/User/SearchByName?" + queryString, { headers: { 'Content-Type': 'application/json' } })
            .then(function (response) {
                response.json().then(function (data) {
                    self.setState({ users: data.users });
                    //console.log(self.state.users);
                });
            })
            .catch(function (err) {
                
                self.setState({ user: null });
            });
    }

    goToUserProfile(id) {
        this.props.history.push(`/perfil/${id}`)
    }

    render() {
        var self = this;
        return (
            <div>
                <MyNav />
                <MySide />
                <div className="row">
                    <div className="col l3">
                    </div>
                    <div className="col l6 s11">
                        {self.state.users.map(function (user) {
                            if (user.profilePic === "" || user.profilePic === " ") {
                                user.profilePic = "/images/default.PNG";
                            }
                            return (
                                <div className="card small" style={{ height: 200 }} onClick={() => { self.goToUserProfile(user.id) }}>
                                    <div className="card-content">
                                        <div key={user.id}>
                                            <span>
                                                <img src={user.profilePic} className="circle ImgGp" alt=""/>
                                            </span>
                                            <span className="name">
                                                {user.name}
                                            </span>
                                            <div className="card-footer">
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
export default withRouter(UserList);