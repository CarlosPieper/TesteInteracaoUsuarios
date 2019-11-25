import React, { Component } from 'react';
import MySide from './component/menu/MySide'
import MyNav from './component/navBar'
import Friends from './component/friends'
class Chat extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <ul className="side-nav fMenu fixed">
                <Friends />
                </ul>
            </div>
        );
    }
}
export default Chat;