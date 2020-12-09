import React, { Component } from 'react'
import Modal from "./GenericModal";
import './styles/UpdateReadUserModal.css'
import { MDBInput } from "mdbreact";
import resources_controller from '../resources/resources_controller'


export default class UpdateUserModal extends Component {
    UpdateUser = () => {
        alert("clic")
    }
    render() {
        return (
            <Modal
                title={this.props.title}
                show={this.props.show}
                onHide={this.props.onHide}
            >

                <form onSubmit={this.props.handleSignUp}>

                    <div className="row">
                        <div className="col">
                            <MDBInput
                                label="Nombre"
                                name="name"
                                type="text"
                                value={this.props.form.name}
                                onChange={this.props.handleChangeForm}

                            />
                        </div>
                        <div className="col">
                            <MDBInput
                                label="Apellido"
                                name="lastname"
                                type="text"
                                value={this.props.form.lastname}
                                onChange={this.props.handleChangeForm}
                            />
                        </div>

                    </div>
                    <div className="row">
                        <div className="col">
                            <MDBInput
                                label="Identificacion"
                                name="identification"
                                type="number"
                                value={this.props.form.identification}
                                onChange={this.props.handleChangeForm}

                            />
                        </div>
                        <div className="col">

                                <MDBInput
                                    label="Contraseña"
                                    name="password"
                                    type="password"
                                    value={this.props.form.password}
                                    onChange={this.props.handleChangeForm}
                                />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <MDBInput
                                label="Email"
                                name="email"
                                type="email"
                                value={this.props.form.email}
                                onChange={this.props.handleChangeForm}
                            />
                        </div>
                        <div className="col mt-2">
                                <button type="button" onClick={() =>resources_controller.getLocation()} className="btn btn-primary btn-block">Obtener Ubicacion</button>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <button type="submit" className="btn btn_www btn-block">Crear Usuario</button>
                        </div>
                    </div>
                </form>


            </Modal>
        )
    };
}
