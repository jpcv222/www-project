import React, { Component } from "react";
import axios from 'axios'
import "./styles/Index.css";

import resources_controller from '../resources/resources_controller'
import validations from '../resources/validations/main'

import Loading from './Loading';
import Login from "../components/Login";
import Alert from "../components/Alert";

const config = require('../config/config')
const jwt = require("jsonwebtoken");

export default class Index extends Component {
    state = {
        loading: false,
        identification: "",
        password: "",

        alertMode: "",
        alertMessage: "",
        alertFooter: "",
        alertTrazaMsg: "",
        alertShow: false,
        alertFooterFlag: false,
    }

    onAlertClose = () => {
        this.setState({ alertShow: false })
    }

    handleChange = e => {
        this.setState({
            ...this.state.form,
            [e.target.name]: e.target.value,
        });
    };

    handleSubmit = async e => {
        e.preventDefault();
        if (!resources_controller.Empty(this.state.identification) &&
            !resources_controller.Empty(this.state.password)) {         

            try {
                const data = {
                    identification: this.state.identification,
                    password: resources_controller.Encrypt(this.state.password)
                }
                
                this.setState({ loading: true });
                const res = await axios.post(config.QUERY_SERVER_URI + "api/user/auth/login", data, {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                });

                if (res.data.status === "error") {
                    this.setState({
                        loading: false,

                        alertShow: true,
                        alertFooter: res.data.id,
                        alertMessage: res.data.description,
                        alertMode: "danger",
                        alertTrazaMsg: res.data.traza,
                        alertFooterFlag: true
                    });
                } else {
                    resources_controller.SetSession(res.data);

                    jwt.verify(res.data.token.toString(), config.ENCRYPTION_SECRET_KEY, (err, decoded) => {
                        if (err) {
                            this.setState({
                                loading: false,

                                alertShow: true,
                                alertFooter: "1005",
                                alertMessage: "Error al intentar iniciar sesion, intente de nuevo",
                                alertMode: "danger",
                                alertTrazaMsg: err.message,
                                alertFooterFlag: true
                            });
                        } else {
                            resources_controller.SetSession(decoded);
                            window.location.href = '/Home'
                        }
                    });


                }
            } catch (error) {
                this.setState({
                    loading: false,

                    alertShow: true,
                    alertFooter: "1005",
                    alertMessage: "Error al intentar iniciar sesion, intente de nuevo",
                    alertMode: "danger",
                    alertTrazaMsg: error.message,
                    alertFooterFlag: true
                });
            }
        } else {
            this.setState({
                alertShow: true,
                alertFooter: "",
                alertMessage: "Campos obligatorios",
                alertMode: "danger",
                alertTrazaMsg: "",
                alertFooterFlag: false
            });
        }

    };

    render() {
        if (this.state.loading) {
            return <Loading />;
        }

        return (
            <React.Fragment>
                <Alert
                    alertShow={this.state.alertShow}
                    alertMode={this.state.alertMode}
                    alertMessage={this.state.alertMessage}
                    alertFooter={this.state.alertFooter}
                    alertTrazaMsg={this.state.alertTrazaMsg}
                    alertFooterFlag={this.state.alertFooterFlag}
                    onAlertClose={this.onAlertClose}
                />
                <Login
                    onSubmit={this.handleSubmit}
                    onChange={this.handleChange}
                    identification={this.state.identification}
                    password={this.state.password}
                />
            </React.Fragment>

        );
    }
}
