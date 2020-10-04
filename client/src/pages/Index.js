import React, { Component } from "react";
import axios from 'axios'
import "./styles/Index.css";

import resources_controller from '../resources/resources_controller'
import validations from '../resources/validations/main'

import Loading from './Loading';
import Login from "../components/Login";

const config = require('../config/config')
const jwt = require("jsonwebtoken");

export default class Index extends Component {
    state = {
        loading: false,
        identification: "",
        password: ""
    }

    componentDidMount(){
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
            this.setState({ loading: true });
            const data = {
                identification: this.state.identification,
                password: resources_controller.Encrypt(this.state.password)
            }

            try {
                const res = await axios.post(config.QUERY_SERVER_URI + "api/user/auth/login", data, {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                });

                if (res.data.status === "error") {    
                    this.setState({ loading: false });              
                    validations.ErrorMessage(res.data.status, res.data.description, res.data.id, res.data.traza);
                } else {
                    resources_controller.SetSession(res.data);

                    jwt.verify(res.data.token.toString(), config.ENCRYPTION_SECRET_KEY, (err, decoded) => {
                        if (err) {
                            this.setState({ loading: false });
                            validations.ErrorMessage("Error", "Error al intentar iniciar sesion, intente de nuevo", 1005, err.message);
                        } else {
                            resources_controller.SetSession(decoded);
                        }
                    });                   
                    window.location.href = '/Home';
                    
                }
            } catch (error) {
                this.setState({ loading: false });
                validations.ErrorMessage("Error", "Error al intentar iniciar sesion, intente de nuevo", 1005, error.message);
            }finally{
                this.setState({ loading: false });
            }
        } else {
            validations.FieldError();
        }

    };

    render() {
        if (this.state.loading) {
            return <Loading />;
        }

        return (
            <Login
                onSubmit={this.handleSubmit}
                onChange={this.handleChange}
                identification={this.state.identification}
                password={this.state.password}
            />
        );
    }
}
