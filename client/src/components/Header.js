import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'

import Navbar from './Navbar';
import logo from '../images/gps.svg';
import NotificationModal from '../components/UserNotificationsModal'
import { MDBIcon, MDBBadge } from "mdbreact";

import './styles/Header.css'

import resources_controller from '../resources/resources_controller'
import validations from '../resources/validations/main'
const config = require('../config/config');

export default class header extends Component {
    constructor() {
        super();
        this.state = {
            show: true,
            scrollPos: 0,
            showNotificationModal: false,
            NotificationModalTitle: "Mis notificaciones",
            notifications: [],
            notificationsCount: 0
        };
    }
    async componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
        if (parseInt(resources_controller.GetSession("role")) === resources_controller.USER_ROL_NUMBER.PACIENTE) {
            await this.GetPatientAlerts();
            await this.GetAlertsCount();
        }

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

    onNotificationModalHide = () => {
        this.setState({
            showNotificationModal: false
        });
    }
    onNotificationModalOpen = () => {
        this.setState({
            showNotificationModal: true
        });
    }

    cerrarSession = () => {
        sessionStorage.clear();
        window.location.href = '/';
    }

    markAsSeenNotification = async (id) => {
        try {
            const data = {};
            data.rowid = id;

            const res = await axios.post(config.QUERY_SERVER_URI + `api/alerts/user/markAsSeen`, data, {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': `Bearer ${this.state.token}`
                }
            });

            if (res.data.status === "error") {
                validations.ErrorToast(res.data.description, res.data.traza, res.data.id);
            } else {
                await this.GetPatientAlerts();
                await this.GetAlertsCount();
            }

        } catch (error) {
            validations.ErrorToast("Ha ocurrido un error", error.message)
        }
    }

    GetAlertsCount = async () => {
        try {
            const data = {};
            data.rowid_user = resources_controller.GetSession("row_id");

            const res = await axios.post(config.QUERY_SERVER_URI + `api/alerts/user/getCount`, data, {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': `Bearer ${this.state.token}`
                }
            });

            if (res.data.status === "error") {
                validations.ErrorToast(res.data.description, res.data.traza, res.data.id);
            } else {
                this.setState({
                    notificationsCount: res.data.notificationsCount
                });
            }

        } catch (error) {
            validations.ErrorToast("Ha ocurrido un error", error.message)
        }
    }


    GetNotificationsCount = async () => {
        try {
            const data = {};
            data.row_id = resources_controller.GetSession("row_id");

            const res = await axios.post(config.QUERY_SERVER_URI + `api/alerts/user/getCount`, data, {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': `Bearer ${this.state.token}`
                }
            });

            if (res.data.status === "error") {
                validations.ErrorToast(res.data.description, res.data.traza, res.data.id);
            } else {
                this.setState({
                    notificationsCount: res.data
                });
            }

        } catch (error) {
            validations.ErrorToast("Ha ocurrido un error", error.message)
        }
    }

    GetPatientAlerts = async () => {
        try {
            const data = {};
            data.role = resources_controller.GetSession("role");
            data.row_id = resources_controller.GetSession("row_id");

            const res = await axios.post(config.QUERY_SERVER_URI + `api/alerts/user/getAlerts`, data, {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': `Bearer ${this.state.token}`
                }
            });

            if (res.data.status === "error") {
                validations.ErrorToast(res.data.description, res.data.traza, res.data.id);
            } else {
                this.setState({
                    notifications: res.data
                });
            }

        } catch (error) {
            validations.ErrorToast("Ha ocurrido un error", error.message)
        }
    }

    render() {
        return (
            <React.Fragment>

                <div id="header" className={this.state.show ? "active" : "hidden"}>
                    <div className="header_style">
                        <div className="logo">
                            <Link className="header-logo" to="/Home">
                                <img alt="" src={logo} title="ValentinSpa" className="img-logo" />
                            </Link>
                        </div>

                        {sessionStorage.getItem("token") &&
                            <React.Fragment>
                                {parseInt(resources_controller.GetSession("role")) === resources_controller.USER_ROL_NUMBER.PACIENTE &&
                                    <React.Fragment>
                                        <NotificationModal
                                            show={this.state.showNotificationModal}
                                            onHide={this.onNotificationModalHide}
                                            title={this.state.NotificationModalTitle}

                                            notifications={this.state.notifications}
                                            markAsSeenNotification={this.markAsSeenNotification}
                                        />
                                        <div class="float-right">
                                            <div className="bell_icon" onClick={this.onNotificationModalOpen}>
                                                <MDBIcon icon="bell" size="1x" className="white-text" />
                                                <MDBBadge color="danger" className="ml-2">{this.state.notificationsCount}</MDBBadge>
                                            </div>
                                        </div>
                                    </React.Fragment>
                                }
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
                        }
                        {!sessionStorage.getItem("token") &&
                            <span className="navbar-brand mx-auto" >Corona Tracking</span>
                        }


                        <Navbar />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
