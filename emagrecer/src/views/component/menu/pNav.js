import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class Pnav extends Component {
    render() {
      return ( 
        <Link to="/perfil">
        <li>
          <div className="user-view" >
            <div className="background">
              <img src="https://gagadget.com/media/post_big/089n76fb7dsc36a4cs6vd57gn7yuji.jpg" width="100%" height="100%" />
            </div>
            <img className="circle" src="https://i.pinimg.com/564x/b9/ad/c1/b9adc144f1e2ddeac878d8e6ee55cd62.jpg  " />
            <span className="white-text name">ERDS</span>
            <span className="white-text email">edrs@gmail.com</span>
          </div>
        </li>

      </Link>
       );
    }
  }
  
export default Pnav;