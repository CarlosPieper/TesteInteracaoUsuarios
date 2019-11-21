import React, { Component } from 'react';
import MyNav from './component/navBar';
import { getId } from '../services/auth';
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

class Profile extends Component {
    id;
    isFetching = true;
    constructor(props) {
        super(props);
        const { match: { params } } = this.props;
        this.id = params.id;
        this.state = {
            isActive: false,
            canEdit: false,
            user: {
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
            },
            posts: [{
                author: null,
                authorName: "",
                id: 0,
                picture: "",
                text: "",
                title: ""
            }],
        }
    }

    componentWillMount() {
        setTimeout(() => { this.GetUserInfo(); }, 100);
        Modal.setAppElement('body');
    }

    toggleModal = () => {
        this.setState({
            isActive: !this.state.isActive
        })
    }

    GetForums() {
        var self = this;
        let queryString = new URLSearchParams();
        queryString.append("id", this.id);
        fetch("https://localhost:5001/Forum/ListUserForums?" + queryString, { headers: { 'Content-Type': 'application/json' } })
            .then(function (response) {
                response.json().then(function (data) {
                    self.setState({ posts: data.forums });
                    //console.log(self.state.posts);
                });
            })
            .catch(function (err) {
                alert("Erro!");
                self.setState({ user: null });
            });
    }

    GetUserInfo() {
        var self = this;
        let queryString = new URLSearchParams();
        queryString.append("id", this.id);
        queryString.append("idLogged", getId());
        fetch("https://localhost:5001/User/GetUserData?" + queryString, { headers: { 'Content-Type': 'application/json' } })
            .then(function (response) {
                response.json().then(function (data) {
                    self.setState({ user: data.user });
                    self.setState({ canEdit: data.canEdit })
                    setTimeout(() => { self.GetForums(); }, 1000);
                });
            })
            .catch(function (err) {
                alert("Erro!");
                self.setState({ user: null });
            });
    }

    correctButton() {
        if (this.state.canEdit) {
            return (
                <div>
                    <a onClick={this.modalEditar} className="btn modal-trigger blue darken-3"><i className="material-icons right">create</i>Editar perfil</a>
                </div>
            )
        }
        else {
            return (
                <div>
                    <a className="btn modal-trigger blue darken-3"><i className="material-icons left">group</i>Convidar</a>
                </div>
            )
        }
    }

    render() {
        var self = this;
        if (self.state.user === undefined || self.state.user === null)
            return "loading";
        else {
            return (
                <div>
                    <MyNav />
                    <div className="row">
                        <div className="col l3">
                        </div>
                        <div className="col l6 s11">
                            <div className="card large card forum">
                                <div className="card-image">
                                    <img className="materialboxed" src={self.state.user.coverPic} />

                                    <div className=" ftPerfil " overflow="hidden">
                                        <img className="materialboxed" src={self.state.user.profilePic} />
                                        <div className="nPerfil">
                                            <span>{self.state.user.name}</span>
                                        </div>

                                    </div>
                                </div>
                                <div className="card-content">
                                    <p >Nasceu em {self.state.user.birthDate.substr(0, 10)}</p>
                                    <p >Mora em {self.state.user.city}</p>
                                    <p >Gênero {self.state.user.genre}</p>
                                    <p >Usuário desde {self.state.user.registrationDate.substr(0, 10)}</p>
                                </div>
                                <div className="card-action">
                                    {self.correctButton()}
                                </div>
                            </div>
                        </div>
                        <div className="col l3"></div>
                    </div>
                    <div>
                        <div className="row">
                            <div className="col l3"></div>
                            <div className="col l6 s11">
                                <h5>Publicações</h5>
                            </div>
                            <div className="col l3"></div>
                        </div>
                        <div className="row">
                            <div className="col l3"></div>
                            <div className="col l6 s11">
                                <div className="card small forum">
                                    <a className="text" href="post.html">
                                        <div className="card-image">
                                            <img src="https://i0.wp.com/www.wallpapermaiden.com/wallpaper/6063/download/1920x1080/nissan-skyline-gt-r-back-view-sport-cars-white.png" />
                                            <span className="card-title">Card Title</span>
                                        </div>
                                        <div className="card-content">
                                            <p >I am a very simple card. I am good at containing small bits of information.I am convenient because I require little markup to use effectively.</p>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div className="col l3"></div>
                        </div>
                    </div>
                    <Modal isOpen={this.state.isActive} onRequestClose={this.toggleModal} style={customStyles}>
                        <div>
                            <div className="modal-content">
                                <h4>Novo Forum</h4>
                                <div className="row">
                                    <form className="col s12">
                                        <div className="row">
                                            <div className="input-field col s6">
                                                <input id="title" type="text" className="validate" />
                                                <label for="title">Titulo</label>
                                            </div>
                                            <div className="file-field input-field col s6">
                                                <div className="btn">
                                                    <span>File</span>
                                                    <input type="file" />
                                                </div>
                                                <div className="file-path-wrapper">
                                                    <input className="file-path validate hide-on-med-and-down" type="text" />
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
                                <a className="waves-effect waves-light btn red" ><i className="material-icons right">close</i>CANCELAR</a>
                                <a className="waves-effect waves-light btn green"><i className="material-icons right">check</i>ENVIAR</a>
                            </div>
                        </div>
                    </Modal>
                </div>
            );
        }
    }
}

export default Profile;