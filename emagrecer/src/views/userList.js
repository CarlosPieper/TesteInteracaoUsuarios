import React, { Component } from 'react';

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
    componentWillMount() {
        setTimeout(() => { this.GetUsersByName(); }, 100);
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
                alert("Erro!");
                self.setState({ user: null });
            });
    }
    render() {
        return (
            <div>

            </div>
        );
    }
}
export default UserList;