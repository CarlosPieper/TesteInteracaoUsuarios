import React from 'react';
import './App.css';
import Routes from "./routes";
import * as signalR from '@aspnet/signalr';
var hubConnection = '';
window.addEventListener('close', ev => {
    hubConnection
        .invoke('OnDisconnectedAsync')
        .catch(err => console.error(err));
});

window.addEventListener('load', ev => {
    var hubConnection = new signalR.HubConnectionBuilder()
        .withUrl("http://localhost:5000/chatHub")
        .configureLogging(signalR.LogLevel.Information)
        .build();
    hubConnection.start().then(function () { });
    hubConnection
        .invoke('OnConnectedAsync')
        .catch(err => console.error(err));
});
const App = () => <Routes />;
export default App;
