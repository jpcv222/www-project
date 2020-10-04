import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Navbar.css';
import $ from 'jquery';




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
                $("#Inicio").removeClass("active-spa");
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
                        {sessionStorage.getItem("token") ? (
                            <React.Fragment>
                                <Link className="nav-bar-item nav-item nav-link active-spa navbar_link" to="/Home" id="Inicio">Inicio</Link>
                                <Link className="nav-bar-item nav-item nav-link navbar_link" to="/GestionCitas" id="GestionCitas">Gestion Citas</Link>
                                <Link className="nav-bar-item nav-item nav-link navbar_link" to="/GestionUsuarios" id="GestionUsuarios">Gestion Usuarios</Link>
                                <Link className="nav-bar-item nav-item nav-link navbar_link" to="/GestionPerfiles" id="GestionPerfiles">Gestion Perfiles</Link>
                            </React.Fragment>
                        ) : (
                                null
                            )}
                    </div>

                </div>
            </nav >
        );
    }
}

export default Navbar;
