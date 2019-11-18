import React, { Component } from 'react';
import NewForum from './newForum';
import Pnav from './pNav';
import LsGroup from './LsGroup';
import NewGroup from './newGroup';
class MySide extends Component {
  render() {
    return (
      <div>
        <ul className="side-nav  fMenu fixed">
          <Pnav />
          <div className="opMenu" >
            <NewForum />
            <NewGroup />
          </div>
          <h4 className="gp">GRUPOS</h4>
          <div className="pa">
            <LsGroup />
          </div>
        </ul>
      </div>
    );
  }
}

export default MySide;