import Sidebar from "react-sidebar";
import React, { Component } from 'react';
import './App.css';


class MyNav extends Component{
  render(){
    return(
      <div className="navbar-fixed">
  <nav className="blue darken-3 " >
    <div className="nav-wrapper container ">
      <ul>
        <li className="left">
          <a  data-toggle="modal" data-target="#myModal"  className="button-collapse"><i className="material-icons">menu</i></a>
        </li>
      </ul>
      <a href="index.html" className="brand-logo center">Logo</a>

      <ul id="nav-mobile" className="right">
        <li><a href="#" data-activates="friends-out" className="button-collapse "><i class="material-icons right ">recent_actors</i>Amigos</a></li>
        <li><a href="perfil.html" className="button hide-on-med-and-down"><i class="material-icons right">account_circle</i>Perfil</a>
        </li>
      </ul>
    </div>
  </nav>
</div>
    );
  }
}

class NewForum extends Component{
  render(){
    return(
<div id="newForum" className="modal modal-fixed-footer  fade"id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">

    <div className="modal-content">
      <h4>Novo Forum</h4>
      <div className="row">
        <form className="col s12">
          <div className="row">
            <div className="input-field col s6">
              <input id="title" type="text" className="validate"/>
              <label for="title">Titulo</label>
            </div>
            <div className="file-field input-field col s6">
              <div className="btn">
                <span>File</span>
                <input type="file"/>
              </div>
              <div className="file-path-wrapper">
                <input className="file-path validate hide-on-med-and-down" type="text"/>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <textarea id="textarea1" className="materialize-textarea"></textarea>
              <label for="textarea1">Textarea</label>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div className="modal-footer">
      <a className="waves-effect waves-light btn red" data-dismiss="modal"><i className="material-icons right">close</i>CANCELAR</a>
      <a class="waves-effect waves-light btn green"><i className="material-icons right">check</i>ENVIAR</a>
    </div>
  </div>
 
    );
  }
}
class MySide extends Component{
  render(){
    return(
 

  <ul className="side-nav  fMenu">
          
  <li>
    <div className="user-view" >
      <div className="background">
        <img src="capa.jpg" width="100%" height="100%"/>
      </div>
      <a href="perfil.html"><img className="circle" src="user.png"/></a>
      <a href="perfil.html"><span className="white-text name">ERDS</span></a>
      <a href="perfil.html"><span className="white-text email">edrs@gmail.com</span></a>
    </div>
  </li>
 <div className="opMenu" >
    <li><a href="#newForum" className="btn modal-trigger blue darken-3">+ FORUM</a></li>
    <li><a href="#newGrupo" className="btn modal-trigger blue darken-3">+ GRUPO</a></li>
 </div>
 <h4 class="gp">GRUPOS</h4>

<div className="pa">
 <ul className="collection  avatar"  >
   
      <li className="collection-item ">
          <img src="user.png"  class="circle ImgGp"/>
          <span className="title">Nando</span>
        </li>
        <li className="collection-item ">
          <img src="user.png"  className="circle ImgGp"/>
          <span className="title">Nando</span>
        </li>
        <li className="collection-item ">
            <img src="user.png"  className="circle ImgGp"/>
            <span className="title">Nando</span>
          </li>
          <li className="collection-item ">
              <img src="user.png"  className="circle ImgGp"/>
              <span className="title">Nando</span>
            </li>
            <li className="collection-item ">
                <img src="user.png"  className="circle ImgGp"/>
                <span className="title">Nando</span>
              </li>
              <li className="collection-item ">
                  <img src="user.png"  className="circle ImgGp"/>
                  <span className="title">Nando</span>
                </li>
                <li class="collection-item ">
                    <img src="user.png"  className="circle ImgGp"/>
                    <span className="title">Nando</span>
                  </li>
      </ul>     
   </div> 
 
    </ul>
  );
}}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: true
    };
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }
  render() {
    return (
      <div>
     <Sidebar
        sidebar={<MySide/>}
        open={this.state.sidebarOpen}
        onSetOpen={this.onSetSidebarOpen}
        styles={{ sidebar: { background: "white" } }}
      >
        <button onClick={() => this.onSetSidebarOpen(true)}>
          Open sidebar
        </button>
      </Sidebar>
      </div>


    );
  }

}




export default App;
