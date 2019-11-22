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
        transform: 'translate(-50%, -45%)',
        height: '550px',
        overlfow: 'scroll'
    },
};

class Profile extends Component {
    id;
    register = '';
    birth = '';
    birthDate = "";
    city = "";
    coverPic = "";
    description = "";
    email = "";
    genre = "";
    name = "";
    password = "";
    profilePic = "";
    registrationDate = "";
    constructor(props) {
        super(props);
        const { match: { params } } = this.props;
        this.id = params.id;
        this.state = {
            isActive: false,
            canEdit: false,
            birthDate: "",
            city: "",
            coverPic: "/images/default.PNG",
            description: "",
            email: "",
            genre: "",
            id: "",
            name: "",
            password: "",
            profilePic: "/images/default.PNG",
            registrationDate: "",
            confirmPassword: "",
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

    UNSAFE_componentWillMount() {
        setTimeout(() => { this.GetUserInfo(); }, 100);
        Modal.setAppElement('body');
    }

    GetUserInfo() {
        var self = this;
        let queryString = new URLSearchParams();
        queryString.append("id", this.id);
        queryString.append("idLogged", getId());
        fetch("https://localhost:5001/User/GetUserData?" + queryString, { headers: { 'Content-Type': 'application/json' } })
            .then(function (response) {
                response.json().then(function (data) {
                    self.setaDados(data)
                    setTimeout(() => { self.GetForums(); }, 1000);
                });
            })
            .catch(function (err) {
                alert("Erro!");
            });
    }

    setaDados(data) {
        this.birthDate = data.user.birthDate.toString().substr(0, 10);
        this.city = data.user.city;
        this.coverPic = data.user.coverPic;
        this.description = data.user.description;
        this.email = data.user.email;
        this.genre = data.user.genre;
        this.id = data.user.id;
        this.name = data.user.name;
        this.profilePic = data.user.profilePic;
        this.registrationDate = data.user.registrationDate.toString().substr(0, 10);
        this.setState({ canEdit: data.canEdit });
        this.setState({ birthDate: data.user.birthDate.toString().substr(0, 10) });
        this.setState({ city: data.user.city });
        this.setState({ coverPic: data.user.coverPic });
        this.setState({ description: data.user.description });
        this.setState({ email: data.user.email });
        this.setState({ genre: data.user.genre });
        this.setState({ id: data.user.id });
        this.setState({ name: data.user.name });
        this.setState({ profilePic: data.user.profilePic });
        this.setState({ registrationDate: data.user.registrationDate.toString().substr(0, 10) });
        this.setState({ password: "" });
        this.setState({ confirmPassword: "" });
    }

    GetForums() {
        var self = this;
        let queryString = new URLSearchParams();
        queryString.append("id", this.id);
        fetch("https://localhost:5001/Forum/ListUserForums?" + queryString, { headers: { 'Content-Type': 'application/json' } })
            .then(function (response) {
                response.json().then(function (data) {
                    self.setState({ posts: data.forums });
                    self.register = self.state.registrationDate.toString().substr(0, 10);
                    self.birth = self.state.birthDate.toString().substr(0, 10);
                });
            })
            .catch(function (err) {
                alert("Erro!");
            });
    }

    UpdateUser() {
        if (this.state.password !== this.state.confirmPassword || this.state.password === "" || this.state.password === undefined) {
            alert("As senhas são obrigatórias e devem coicidir!");
        }
        else if (!this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
            alert("Email inválido!")
        }
        else if (this.state.name === "" || this.state.name === " ") {
            alert("Nome é obrigatório!")
        }
        else {
            setTimeout(() => { this.PostProfilePic() }, 100);
            setTimeout(() => { this.PostCoverPic() }, 100);
            var formData = new FormData();
            formData.append("Email", this.state.email);
            formData.append("Password", this.state.password);
            formData.append("Name", this.state.name);
            formData.append("BirthDate", this.state.birthDate);
            formData.append("City", this.state.city);
            formData.append("Id", this.state.id);
            formData.append("Genre", this.state.genre);
            formData.append("Description", this.state.description);
            var self = this;
            const options = {
                method: 'POST',
                body: formData,
            }
            const request = new Request('https://localhost:5001/User/Edit', options);
            fetch(request).then(function (response) {
                response.json().then(function (data) {
                    alert("Alterado com sucesso!")
                    setTimeout(() => { self.GetUserInfo(); }, 1000);
                    self.toggleModal();
                })
            }).catch(function (err) {
                alert("Erro ao alterar!")
            });
        }
    }

    PostProfilePic() {
        var formData = new FormData();
        formData.append("name", this.name);
        formData.append(this.profilePic.name, this.profilePic);
        const options = {
            method: 'POST',
            body: formData,
        }
        const request = new Request('https://localhost:5001/User/SaveProfilePic', options);
        fetch(request).then(function (response) {
        });
    }

    PostCoverPic() {
        var formData = new FormData();
        formData.append("name", this.name);
        formData.append(this.coverPic.name, this.coverPic);
        const options = {
            method: 'POST',
            body: formData,
        }
        const request = new Request('https://localhost:5001/User/SaveCoverPic', options);
        fetch(request).then(function (response) {
        });
    }

    correctButton() {
        if (this.state.canEdit) {
            return (
                <div>
                    <a onClick={this.toggleModal} className="btn modal-trigger blue darken-3"><i className="material-icons right">create</i>Editar perfil</a>
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

    toggleModal = () => {
        this.setState({
            isActive: !this.state.isActive
        })
    }

    saveCoverPic(e) {
        console.log(e);
        let files = e.target.files;
        this.coverPic = files[0];
    }

    saveProfilePic(e) {
        let files = e.target.files;
        this.profilePic = files[0];
    }

    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        var self = this;
        if (self.coverPic === "" || self.coverPic === " " || self.coverPic === undefined || self.coverPic === null)
            self.coverPic = '/images/default.PNG';
        if (self.profilePic === "" || self.profilePic === " " || self.profilePic === undefined || self.profilePic === null)
            self.profilePic = '/images/default.PNG';
        if (self.state === undefined || self.state === null)
            return "loading";
        else {
            return (
                <div>
                    <MyNav />
                    <div className="row">
                        <div className="col l2">
                        </div>
                        <div className="col l8 s9">
                            <div className="card large card forum" style={{height: 620}}>
                                <div className="card-image">
                                    <img className="materialboxed" src={self.coverPic} />
                                    <div className=" ftPerfil" overflow="hidden">
                                        <img className="materialboxed" src={self.profilePic} />
                                        <div className="nPerfil">
                                            <span>{self.name}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-content">
                                    <p >Nasceu em {self.birthDate}</p>
                                    <p >Mora em {self.city}</p>
                                    <p >Gênero {self.genre}</p>
                                    <p >Usuário desde {self.registrationDate}</p>
                                    <p >{self.description}</p>
                                </div>
                                <div className="card-action" >
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
                                <div className="frame">
                                    <div className="scroll">
                                        <div className="row">
                                            <form className="col s12">
                                                <h5 style={{ backgroundColor: 'white', color: 'black' }}>EDITAR PERFIL</h5>
                                                <div className="row">
                                                    <div className="input-field col s12" style={{ marginTop: 0 }}>
                                                        <input type="text" name="name" defaultValue={self.state.name} onChange={this.changeHandler} />
                                                        <label className="active">Nome</label>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="input-field col s6" style={{ marginTop: 0 }} onChange={this.changeHandler}>
                                                        <input type="password" name="password" />
                                                        <label className="inputLabel">Senha</label>
                                                    </div>
                                                    <div className="input-field col s6" style={{ marginTop: 0 }} onChange={this.changeHandler}>
                                                        <input type="password" name="confirmPassword" />
                                                        <label className="inputLabel">Confirmar senha</label>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="input-field col s12" style={{ marginTop: 0 }}>
                                                        <input type="email" name="email" defaultValue={self.state.email} onChange={this.changeHandler} />
                                                        <label className="active">E-mail</label>
                                                    </div >
                                                </div >
                                                <div className="row">
                                                    <div className="input-field col s6" style={{ marginTop: 0 }}>
                                                        <input type="date" name="birthDate" defaultValue={self.birth} onChange={this.changeHandler} />
                                                        <label className="active">Data de Nascimento</label>
                                                    </div>
                                                    <div className="input-field col s6" style={{ marginTop: 0 }}>
                                                        <input type="text" name="city" defaultValue={self.state.city} onChange={this.changeHandler} />
                                                        <label className="active">Cidade (opcional)</label>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="input-field col s6" style={{ marginTop: 0 }}>
                                                        <input type="text" name="genre" defaultValue={self.state.genre} onChange={this.changeHandler} />
                                                        <label className="active">Gênero (opcional)</label>
                                                    </div>
                                                    <div className="input-field col s6" style={{ marginTop: 0 }}>
                                                        <input disabled type="date" name="registerDate" defaultValue={self.register} onChange={this.changeHandler} />
                                                        <label className="active">Data de Registro</label>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="file-field input-field col s12" style={{ marginTop: 0 }}>
                                                        <div className="waves-effect waves-light btn">
                                                            <i className="material-icons">add_a_photo</i>
                                                            <input type="file" accept='image/*' name="profilePic" onChange={(e) => self.saveProfilePic(e)} />
                                                        </div>
                                                        <div className="file-path-wrapper" style={{ marginTop: 0 }}>
                                                            <input className="file-path validate" type="text"
                                                                placeholder="Foto de Perfil" defaultValue={self.state.profilePic} disabled />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="file-field input-field col s12" style={{ marginTop: 0 }}>
                                                        <div className="waves-effect waves-light btn" >
                                                            <i className="material-icons">add_a_photo</i>
                                                            <input type="file" accept='image/*' name="coverPic" onChange={(e) => self.saveCoverPic(e)} />
                                                        </div>
                                                        <div className="file-path-wrapper" style={{ marginTop: 0 }}>
                                                            <input className="file-path validate" type="text"
                                                                placeholder="Foto de Capa" defaultValue={self.state.coverPic} disabled />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="input-field col s12" style={{ marginTop: 0 }}>
                                                        <textarea name="description" className="materialize-textarea" defaultValue={self.state.description} onChange={this.changeHandler}></textarea>
                                                        <label className="active">Descrição</label>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <div className="row col s12">
                                    <a className="waves-effect waves-light btn red" onClick={this.toggleModal} style={{ width: 250, marginRight: 5 }}><i className="material-icons right">close</i>CANCELAR</a>
                                    <a className="waves-effect waves-light btn green" onClick={() => { this.UpdateUser() }} style={{ width: 250, marginLeft: 5 }}><i className="material-icons right">check</i>ENVIAR</a>
                                </div>
                            </div>
                        </div>
                    </Modal>
                </div>
            );
        }
    }
}

export default Profile;