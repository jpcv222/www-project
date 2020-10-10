import React, { Component } from 'react'
import './styles/Login.css';

export default class Login extends Component {
    componentDidMount() {
        if (sessionStorage.getItem("token")) {
            window.history.back();
        }
    }
    render() {
        return (
            <div className="row">

                <form onSubmit={this.props.onSubmit} className="col-md-a mx-auto card card_www" > 

                    <div className="text-center  p-5">
                        <p className="h4 mb-4">Inicio de sesion</p>
                        <input
                            name="identification"
                            type="number"
                            id="identification"
                            className="form-control mb-4"
                            placeholder="Identificacion"
                            value={this.props.criterio}
                            onChange={this.props.onChange}

                        />
                        <input
                            name="password"
                            type="password"
                            id="password"
                            className="form-control mb-4"
                            placeholder="Contraseña"
                            value={this.props.password}
                            onChange={this.props.onChange}
                        />

                        <button
                            id="btn-login"
                            className="btn btn-block my-4"
                            type="submit"
                        >
                            Iniciar Sesion
                        </button>

                    </div>
                </form>

            </div>
        )
    }
}
