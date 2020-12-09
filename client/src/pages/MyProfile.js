import React, { Component } from 'react';
import axios from 'axios'

import resources_controller from '../resources/resources_controller'
import validations from '../resources/validations/main'
import { MDBIcon, MDBTooltip } from "mdbreact";

import UpdateModal from '../components/UserManagementModal'
import Loading from './Loading';
import Map from '../components/Map';

import './styles/MyProfile.css'
// import socket from '../utils/Socket'
const config = require('../config/config')

export default class MyProfile extends Component {
    componentDidMount() {
        if (!sessionStorage.getItem("token")) {
            window.location.href = '/';
        } else {
            // socket.emit('connection', { row_id: parseInt(resources_controller.GetSession("row_id")) })
        }
    }
    state = {
        lat: resources_controller.GetSession("house_latitude"),
        lng: resources_controller.GetSession("house_longitude"),
        whithOldLocation: true,
        form: {
            name: resources_controller.GetSession("name"),
            lastname: resources_controller.GetSession("lastname"),
            identification: resources_controller.GetSession("identification"),
            email: resources_controller.GetSession("email"),
            password: "",
            role: resources_controller.GetSession("role"),
        },
        manageUserModalShow: false,
        action: 0,
        modalTitle: "",
        loading: false,
    }

    onUpdateModalHide = () => {
        this.setState({
            manageUserModalShow: false
        });
    }
    handleUpdateModal = () => {
        this.setState({
            manageUserModalShow: true,
            action: resources_controller.USER_MODAL_ACTION.update,
            modalTitle: "Datos del usuario " + resources_controller.GetSession("name"),
        })
    }
    handleChange = e => {
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value,
            },
        });
    };
    OnEditPass = async () => {
        if (!resources_controller.FieldIsBlank2(this.state.form.password)) {
            try {
                const data = {};
                data.password = resources_controller.Encrypt(this.state.form.password)
                this.setState({ loading: true });
                const res = await axios.post(config.QUERY_SERVER_URI + `api/user/manage/updatePassword/${resources_controller.GetSession("row_id")}`, data, {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                        'Authorization': `Bearer ${this.state.token}`
                    }
                });

                if (res.data.status === "error") {
                    this.setState({
                        loading: false,
                        form: {
                            ...this.state.form,
                            password: ""
                        }
                    });
                    validations.ErrorToast(res.data.description, res.data.traza, res.data.id);
                } else {
                    validations.SuccessToast(res.data.description);
                    this.setState({
                        loading: false,
                        form: {
                            ...this.state.form,
                            password: ""
                        }
                    });

                }

            } catch (error) {
                this.setState({
                    loading: false,
                    form: {
                        ...this.state.form,
                        password: ""
                    }
                });
                validations.ErrorToast("Ha ocurrido un error", error.message)
            }
        } else {
            validations.ErrorToast("Debe escribir una contraseña")
        }
    }
    ChangeMapLocation = () => {
        resources_controller.getLocation()

        window.setTimeout(() => {
            // if (resources_controller.ValidateLocation()) {
            this.setState({
                lat: resources_controller.GetSession("latitude"),
                lng: resources_controller.GetSession("longitude"),
                whithOldLocation: false
            })
            // }
        }, 700);
    }

    updateLocation = async () => {
        if (resources_controller.ValidateLocation()) {
            try {
                const data = {};
                data.house_longitude = this.state.lng;
                data.house_latitude = this.state.lat
                this.setState({ loading: true });
                const res = await axios.post(config.QUERY_SERVER_URI + `api/user/manage/updateLocation/${resources_controller.GetSession("row_id")}`, data, {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                        'Authorization': `Bearer ${this.state.token}`
                    }
                });

                if (res.data.status === "error") {
                    this.setState({
                        loading: false
                    });
                    validations.ErrorToast(res.data.description, res.data.traza, res.data.id);
                } else {
                    validations.SuccessToast(res.data.description);
                    this.setState({
                        loading: false,
                    });
                    resources_controller.ModifySession("house_longitude", this.state.lng);
                    resources_controller.ModifySession("house_latitude", this.state.lat);
                    resources_controller.ModifySession("latitude", "");
                    resources_controller.ModifySession("longitude", "");

                }

            } catch (error) {
                this.setState({
                    loading: false
                });
                validations.ErrorToast("Ha ocurrido un error", error.message)
            }
        }
    }

    onSubmitUpdate = async e => {
        e.preventDefault();
        try {
            if (resources_controller.ValidateUserUpdate(this.state.form)) {
                const data = this.state.form;

                this.setState({ loading: true });
                const res = await axios.post(config.QUERY_SERVER_URI + `api/user/manage/updateUser/${resources_controller.GetSession("row_id")}`, data, {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                        'Authorization': `Bearer ${this.state.token}`
                    }
                });

                if (res.data.status === "error") {
                    this.setState({
                        loading: false
                    });
                    validations.ErrorToast(res.data.description, res.data.traza, res.data.id);
                } else {
                    validations.SuccessToast(res.data.description);
                    this.onUpdateModalHide()
                    this.setState({
                        loading: false,
                    });
                    resources_controller.ModifySession("name", this.state.form.name);
                    resources_controller.ModifySession("lastname", this.state.form.lastname);
                    resources_controller.ModifySession("identification", this.state.form.identification);
                    resources_controller.ModifySession("email", this.state.form.email);
                    resources_controller.ModifySession("role", this.state.form.role);

                }

            }

        } catch (error) {
            this.setState({
                loading: false
            });
            validations.ErrorToast("Ha ocurrido un error", error.message)
        }

    }

    render() {
        if (this.state.loading) {
            return <Loading />;
        }
        return (
            <div>

                <div className="row mb-3" >
                    <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 mb-1">
                        <button onClick={this.ChangeMapLocation} className="btn btn-primary btn2" id="btn-location">
                            <MDBIcon icon="map-marked-alt" size="2x" />
                        </button>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 mb-1">
                        <button onClick={this.updateLocation} className="btn btn-block btn-primary btn2 " disabled={this.state.whithOldLocation}>
                            Actualizar ubicacion
                        </button>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                        <button onClick={this.handleUpdateModal} className="btn btn-block btn-primary btn2">
                            Actualizar datos
                        </button>
                    </div>

                </div>

                <div className="row" >
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <Map
                            lat={this.state.lat}
                            lng={this.state.lng}

                            name={"Casa"}
                        />
                    </div>
                </div>

                <UpdateModal
                    show={this.state.manageUserModalShow}
                    onHide={this.onUpdateModalHide}
                    title={this.state.modalTitle}
                    action={this.state.action}

                    onChange={this.handleChange}
                    form={this.state.form}
                    editPass={this.OnEditPass}
                    onSubmitUpdate={this.onSubmitUpdate}
                />
            </div>
        )
    }
}
