import React, { Component } from 'react';
import MyNav from './component/navBar';


class Perfil extends Component {
    render() {
        return (
            <div className="row">
                <div className="col l3">
                </div>
                <div className="col l6 s11">
                    <div className="card large card forum">
                        <div className="card-image">
                            <img className="materialboxed" src="https://gagadget.com/media/post_big/089n76fb7dsc36a4cs6vd57gn7yuji.jpg  " />

                            <div className=" ftPerfil " overflow="hidden">
                                <img className="materialboxed" src="https://i.pinimg.com/564x/b9/ad/c1/b9adc144f1e2ddeac878d8e6ee55cd62.jpg" />
                                <div className="nPerfil">
                                    <span>Card Title</span>
                                </div>

                            </div>
                        </div>
                        <div className="card-content">
                            <p >I am a very simple card. I am good at containing small bits of information.
                I am convenient because I require little markup to use effectively.</p>
                        </div>



                        <div class="card-action">
                            <a href="#newComent" className="btn modal-trigger blue darken-3"><i className="material-icons right">create</i>Editar perfil</a>
                            <a href="#newComent" className="btn modal-trigger blue darken-3"><i className="material-icons left">group</i>convidar</a>
                        </div>
                    </div>
                </div>
                <div class="col l3"></div>
            </div>
        );
    }
}
class ForumPerfil extends Component {
    render() {
        return (
            <div>
                <div class="row">
                    <div class="col l3"></div>
                    <div class="col l6 s11">
                        <h5>Forums de Nando</h5>
                    </div>
                    <div class="col l3"></div>
                </div>
                <div class="row">
                    <div class="col l3"></div>
                    <div class="col l6 s11">
                        <div class="card small forum">
                            <a class="text" href="post.html">
                                <div class="card-image">
                                    <img src="https://i0.wp.com/www.wallpapermaiden.com/wallpaper/6063/download/1920x1080/nissan-skyline-gt-r-back-view-sport-cars-white.png"/>
                                    <span class="card-title">Card Title</span>
                                </div>
                                <div class="card-content">
                                    <p >I am a very simple card. I am good at containing small bits of information.I am convenient because I require little markup to use effectively.</p>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="col l3"></div>
                </div>
            </div>

        );
    }
}





class Profile extends Component {
    render() {
        return (
            <div>
                <MyNav/>
                <Perfil />
                <ForumPerfil />
            </div>

        );
    }
}
export default Profile;