import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Navbar.css';
import $ from 'jquery';
import resources_controller from '../resources/resources_controller'

import { MDBIcon, MDBBtn, MDBBadge } from "mdbreact";

class Navbar extends React.Component {
    async componentDidMount() {
        this.setActive();
    }

    setActive = async () => {
        $(".nav-bar-item").on('click', function () {
            $(".nav-bar-item").removeClass("active-spa");
            $(this).addClass("active-spa");
        });

        $(".nav-bar-item").each(function () {
            let id = $(this).attr("id");
            if (window.location.toString().includes(id)) {
                $("#Home").removeClass("active-spa");
                $("#" + id).removeClass("active-spa");
                $("#" + id).addClass("active-spa");
            }
        });
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light navbar_spa" >

                <span className="navbar_span">/</span>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">

                    <div className="navbar-nav nav-pills">
                        {resources_controller.GetSession("token") &&
                            <React.Fragment>
                                <Link className="nav-bar-item nav-item nav-link active-spa navbar_link" to="/Home" id="Home">Inicio</Link>
                                {(parseInt(resources_controller.GetSession("role")) === resources_controller.USER_ROL_NUMBER.SUPER_USER ||
                                    parseInt(resources_controller.GetSession("role")) === resources_controller.USER_ROL_NUMBER.DOCTOR) ?
                                    <Link className="nav-bar-item nav-item nav-link navbar_link" to="/UserManagement" id="UserManagement">Gestion Usuarios</Link>
                                    :
                                    null
                                }
                                {(parseInt(resources_controller.GetSession("role")) === resources_controller.USER_ROL_NUMBER.PACIENTE ||
                                    parseInt(resources_controller.GetSession("role")) === resources_controller.USER_ROL_NUMBER.DOCTOR) ?
                                    <Link className="nav-bar-item nav-item nav-link navbar_link" to="/Chat" id="Chat">Chat</Link>
                                    :
                                    null
                                }
                                



                            </React.Fragment>
                        }
                    </div>

                </div>
            </nav >
        );
    }
}

export default Navbar;
