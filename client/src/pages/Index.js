import React, { Component } from "react";
import axios from 'axios'
import "./styles/Index.css";

import resources_controller from '../resources/resources_controller'
import validations from '../resources/validations/main'

import Loading from './Loading';
import Login from "../components/Login";
import Carousel from '../components/Carousel'

import { MDBIcon, MDBTooltip } from "mdbreact";


const config = require('../config/config')
const jwt = require("jsonwebtoken");

export default class Index extends Component {
    componentDidMount() {
        resources_controller.ModifySession("latitude", "");
        resources_controller.ModifySession("longitude", "");
    }
    state = {
        loading: false,
        identification: "",
        password: "",

        manageUserModalShow: false,
        modalTitle: "",
        form: {
            name: "",
            lastname: "",
            identification: "",
            email: "",
            password: "",
            role: 2,
        },
    }

    handleChange = e => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value,
        });
    };
    handleChangeForm = e => {
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value,
            },
        });
    };

    handleSubmit = async e => {
        e.preventDefault();
        if (!resources_controller.Empty(this.state.identification) &&
            !resources_controller.Empty(this.state.password)) {
            if (resources_controller.ValidateLocation()) {

                try {
                    const data = {
                        identification: this.state.identification,
                        password: resources_controller.Encrypt(this.state.password),
                        current_latitude: parseFloat(resources_controller.GetSession("latitude")),
                        current_longitude: parseFloat(resources_controller.GetSession("longitude"))
                    }
                    console.log(data)

                    this.setState({ loading: true });
                    const res = await axios.post(config.QUERY_SERVER_URI + "api/user/auth/login", data, {
                        headers: {
                            'Content-Type': 'application/json;charset=UTF-8'
                        }
                    });

                    if (res.data.status === "error") {
                        this.setState({
                            loading: false
                        });
                        validations.ErrorToast(res.data.description, res.data.traza, res.data.id)
                    } else {
                        resources_controller.SetSession(res.data);

                        jwt.verify(res.data.token.toString(), config.ENCRYPTION_SECRET_KEY, (err, decoded) => {
                            if (err) {
                                this.setState({
                                    loading: false
                                });
                                validations.ErrorToast("Ha ocurrido un error", err.message)
                            } else {
                                resources_controller.SetSession(decoded);
                                window.location.href = '/Home'
                                resources_controller.ModifySession("latitude", "");
                                resources_controller.ModifySession("longitude", "");
                            }
                        });


                    }
                } catch (error) {
                    this.setState({
                        loading: false
                    });
                    validations.ErrorToast("Ha ocurrido un error", error.message)
                }
            }
        } else {
            validations.ErrorToast("Campos obligatorios")
        }

    };
    handleSignUp = async e => {
        e.preventDefault();
        try {
            if (resources_controller.ValidateUser(this.state.form)) {
                const data = this.state.form;
                data.password = resources_controller.Encrypt(data.password)
                data.house_address = "";
                data.house_longitude = resources_controller.GetSession("longitude");
                data.house_latitude = resources_controller.GetSession("latitude");

                this.setState({ loading: true });
                const res = await axios.post(config.QUERY_SERVER_URI + "api/user/manage/insertUser", data, {
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
                    this.onHideModal();

                }

            }

        } catch (error) {
            this.setState({
                loading: false
            });
            validations.ErrorToast("Ha ocurrido un error", error.message)
            console.log(error)
        }
    }

    handleInsertModal = () => {
        this.setState({
            manageUserModalShow: true,
            modalTitle: "Registro de usuarios",
            form: {
                name: "",
                lastname: "",
                identification: "",
                email: "",
                password: "",
                role: 2,
            },
        });
    }
    onHideModal = () => {
        this.setState({
            manageUserModalShow: false,
            form: {
                name: "",
                lastname: "",
                identification: "",
                email: "",
                password: "",
                role: 2,
            },
        });
        resources_controller.ModifySession("latitude", "");
        resources_controller.ModifySession("longitude", "");
    }

    render() {
        if (this.state.loading) {
            return <Loading />;
        }

        return (
            <React.Fragment>
                <div className="row" >
                    <MDBTooltip domElement tag="span" placement="top">
                        <div className="col-lg-1 col-md-1 col-sm-12 col-xs-12 mb-1 float-right">
                            <button onClick={() => resources_controller.getLocation()} className="btn btn-primary btn2" id="btn-location">
                                <MDBIcon icon="map-marked-alt" size="2x" />
                            </button>
                        </div>
                        <span>Obtener ubicacion</span>
                    </MDBTooltip>
                </div>
                {/* <div className="row " >
                    <div class="col-lg-9 col-md-9 col-sm-12 col-xs-12 padding-0">
                        <Carousel />
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12 padding-0"> */}
                    <div className="col-md-a mx-auto">
                        <Login
                            onSubmit={this.handleSubmit}
                            onChange={this.handleChange}
                            identification={this.state.identification}
                            password={this.state.password}

                            show={this.state.manageUserModalShow}
                            onHide={this.onHideModal}
                            title={this.state.modalTitle}
                            handleChangeForm={this.handleChangeForm}
                            form={this.state.form}
                            handleSignUp={this.handleSignUp}
                            onOpen={this.handleInsertModal}
                        />
                        </div>
                    {/* </div>
                </div> */}
            </React.Fragment>

        );
    }
}
