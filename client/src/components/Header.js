import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

import logo from '../images/gps.svg';

import './styles/Header.css'

import resources_controller from '../resources/resources_controller'
export default class header extends Component {
    constructor() {
        super();
        this.state = {
            show: true,
            scrollPos: 0
        };
    }
    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
    }
    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }
    handleScroll = () => {
        this.setState({
            scrollPos: document.body.getBoundingClientRect().top,
            show: document.body.getBoundingClientRect().top > this.state.scrollPos
        });
    };

    cerrarSession = () => {
        sessionStorage.clear();
        window.location.href = '/';
    }

    render() {
        return (

            <div id="header" className={this.state.show ? "active" : "hidden"}>
                <div className="header_style">
                    <div className="logo">
                        <Link className="header-logo" to="/Home">
                            <img alt="" src={logo} title="ValentinSpa" className="img-logo" />
                        </Link>
                    </div>
                    {sessionStorage.getItem("token") ? (
                        <React.Fragment>
                            <div className="profile-menu">
                                <div className="btn-group tx-profilemenu dropdown">
                                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        {resources_controller.GetSession("name")}
                                </button>
                                    <div className="dropdown-menu " aria-labelledby="dropdownMenuButton" role="menu">
                                        <Link className="nav-link" to="/MyProfile">Mi Perfil</Link>
                                        <Link
                                            className="nav-link"
                                            onClick={() => this.cerrarSession()}
                                        >
                                            Cerrar sesion
                                    </Link>
                                    </div>
                                </div>
                            </div>

                        </React.Fragment>
                    ) : (
                            <span className="navbar-brand mx-auto" >Corona Tracking</span>
                        )}

                    <Navbar />
                </div>
            </div>
        );
    }
}
