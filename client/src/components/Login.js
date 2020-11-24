import React, { Component } from 'react'
import './styles/Login.css';
import { MDBInput } from "mdbreact";
import SignUpModal from '../components/UserSignUpModal'

export default class Login extends Component {
    componentDidMount() {
        if (sessionStorage.getItem("token")) {
            window.history.back();
        }
    }

    render() {
        return (

            <div className="row" >
                <form onSubmit={this.props.onSubmit} className="col-md-a mx-auto card card_www" >

                    <div className=" p-4">
                        <p className="h4 mb-4">Acceda a Corona Tracking</p>
                        <div className="mt-5">
                        <MDBInput
                            label="Identificacion"
                            name="identification"
                            type="number"
                            id="identification"
                            className="form-control mb-4"
                            value={this.props.criterio}
                            onChange={this.props.onChange}

                        />
                        <MDBInput
                            label="Clave"
                            name="password"
                            type="password"
                            id="password"
                            className="form-control mb-4"
                            placeholder="Contraseña"
                            value={this.props.password}
                            onChange={this.props.onChange}
                        />
                        </div>

                        <div className="row">
                            <div className="col">
                                <button
                                    id="btn-login"
                                    className="btn btn-block my-4"
                                    type="submit"
                                >
                                    Iniciar Sesion
                        </button>
                            </div>

                        </div>
                        <div className="row button_row">

                            <div className="col">
                                <button
                                    className="btn btn-block btn-primary"
                                    type="button"
                                    onClick={this.props.onOpen}
                                >
                                    Registrarse
    </button>
                            </div>

                        </div>

                    </div>


                </form>

                <SignUpModal
                    show={this.props.show}
                    onHide={this.props.onHide}
                    title={this.props.title}
                    handleChangeForm={this.props.handleChangeForm}
                    form={this.props.form}
                    handleSignUp={this.props.handleSignUp}
                />
            </div>


        )
    }
}
