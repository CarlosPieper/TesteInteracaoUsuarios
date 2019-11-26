import React, { Component } from 'react';
import MyNav from './component/navBar';
import MySide from './component/menu/MySide';
class Chat extends Component {
    //constructor(props) {
    //    super(props);
    //}
    render() {
        return (
            <div>
                <MyNav />
                <MySide />

            </div>
        );
    }
}
export default Chat;