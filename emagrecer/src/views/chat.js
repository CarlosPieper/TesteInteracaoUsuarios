import React, { Component } from 'react';
import * as signalR from '@aspnet/signalr';
import MyNav from './component/navBar';
import MySide from './component/menu/MySide';
import { getId } from '../services/auth';

class Chat extends Component {
    id;
    constructor(props) {
        super(props);
        this.state = {
            nick: '',
            message: '',
            messages: [],
            hubConnection: null,
        };
    }

    componentDidMount = () => {
        const hubConnection = new signalR.HubConnectionBuilder()
            .withUrl("http://localhost:5000/chatHub")
            .configureLogging(signalR.LogLevel.Information)
            .build();
        const nick = '';
        this.setState({ hubConnection, nick }, () => {
            this.state.hubConnection
                .start()
                .then();

            this.state.hubConnection.on('sendToAll', (nick, receivedMessage, id) => {
                const msg = {
                    id: id,
                    text: receivedMessage,
                    nick: nick
                }
                const messages = this.state.messages.concat([msg]);
                this.setState({ messages });
            });
        });
        this.GetUserInfo();
    }

    GetUserInfo() {
        var self = this;
        let queryString = new URLSearchParams();
        queryString.append("id", getId());
        queryString.append("idLogged", getId());
        fetch("https://localhost:5001/User/GetUserData?" + queryString, { headers: { 'Content-Type': 'application/json' } })
            .then(function (response) {
                response.json().then(function (data) {
                    self.setState({ nick: data.user.name });
                    self.id = data.user.id;
                });
            })
            .catch(function (err) {

            });
    }

    sendMessage = () => {
        this.state.hubConnection
            .invoke('sendToAll', this.state.nick, this.state.message, this.id)
            .catch(err => console.error(err));

        this.setState({ message: '' });
    };

    changeHandler = e => {
        this.setState({ message: e.target.value });
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    scrollToBottom = () => {
        var element = document.getElementById("row");
        element.scrollIntoView();
        element.scrollIntoView(false);
        element.scrollIntoView({ block: "end" });
        element.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    }

    messages() {
        var self = this;
        if (this.state.messages.length > 0) {
            return (
                this.state.messages.map((message, index) => (
                    <div key={index}>
                        {message.id === self.id
                            ?
                            <div class="card-panel teal lighten-2 received" style={{ display: 'block' }}>
                                <div className="msgreceived"><strong>{message.nick}</strong></div>
                                <div>{message.text}</div>
                            </div>
                            :
                            <div class="card-panel teal lighten-2 sent" style={{ display: 'block' }}>
                                <div className="msgsent"><strong>{message.nick}</strong></div>
                                <div>{message.text}</div>
                            </div>
                        }
                    </div>
                )
                )
            )
        }
        else {
            return (
                <div>
                    <h6>Nenhuma mensagem por enquanto...</h6>
                </div>
            )
        }
    }

    render() {
        var elClass;
        return (
            <div>
                <MyNav />
                <MySide />
                <div className="row" id="row">
                    <div className="col l3 center"></div>
                    <div className="col l9">
                        <div className="row">
                            {this.messages()}
                        </div>
                        <div className="row">
                            <span className="input-field col s11">
                                <input name="message" type="text" onChange={this.changeHandler} value={this.state.message}></input>
                                <label className="inputLabel">Mensagem</label>
                            </span>
                            <span className="input-field col s1">
                                <button className="btn-floating btn-small waves-effect waves-light blue" onClick={this.sendMessage}><i className="material-icons">send</i></button>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Chat;