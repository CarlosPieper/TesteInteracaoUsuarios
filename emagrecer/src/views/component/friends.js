import React, { Component } from 'react';
class Friends extends Component{
    render(){
      return(
        <div className="row">
        <div className="col l3">
        </div>
        <div className="col l6 s11">
        </div>
        <div  className="col l3 hide-on-med-and-down amigos"  >
        
          <ul className="collection "  >
            <li className="collection-item">
              <h4 className="amg">AMIGOS</h4>
            </li>
            
                <li className="collection-item avatar">
                  <img src="user.png" className="circle"/>
                  <span className="name">Nando</span>
                  
                </li>
                <li className="collection-item avatar">
                  <img src="user.png" className="circle"/>
                  <span className="name">Nando</span>
                  
                </li>
              </ul>     
        
      </div>
      </div>
      );}
    }
export default Friends;