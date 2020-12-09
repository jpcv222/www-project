import React, { Component } from 'react'
import Modal from "./GenericModal";
import './styles/UpdateReadUserModal.css'
import { MDBInput } from "mdbreact";
import resources_controller from '../resources/resources_controller'


export default class UpdateUserModal extends Component {
    componentDidMount() {
    }
    render() {
        return (
            <Modal
                title={this.props.title}
                show={this.props.show}
                onHide={this.props.onHide}
            >

                <form onSubmit={this.props.action === resources_controller.USER_MODAL_ACTION.update ? this.props.onSubmitUpdate : this.props.onSubmit}>

                    <div className="row">
                        <div className="col">
                            <MDBInput
                                label="Nombre"
                                name="name"
                                type="text"
                                value={this.props.form.name}
                                onChange={this.props.onChange}

                            />
                        </div>
                        <div className="col">
                            <MDBInput
                                label="Apellido"
                                name="lastname"
                                type="text"
                                value={this.props.form.lastname}
                                onChange={this.props.onChange}
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
                                onChange={this.props.onChange}

                            />
                        </div>
                        <div className="col">
                            {this.props.action === resources_controller.USER_MODAL_ACTION.update &&
                                <MDBInput
                                    label="Contraseña"
                                    name="password"
                                    type="password"
                                    value={this.props.form.password}
                                    onChange={this.props.onChange}
                                    icon="edit"
                                    onIconClick={(e => {
                                        this.props.editPass()
                                    })}
                                />
                            }
                            {this.props.action === resources_controller.USER_MODAL_ACTION.insert &&
                                <MDBInput
                                    label="Contraseña"
                                    name="password"
                                    type="password"
                                    value={this.props.form.password}
                                    onChange={this.props.onChange}
                                />
                            }
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <MDBInput
                                label="Email"
                                name="email"
                                type="email"
                                value={this.props.form.email}
                                onChange={this.props.onChange}
                            />
                        </div>
                    </div>

                    <div className="row mb-3">
                        {((parseInt(resources_controller.GetSession("role")) != resources_controller.USER_ROL_NUMBER.PACIENTE) &&
                            ((parseInt(resources_controller.GetSession("role")) === resources_controller.USER_ROL_NUMBER.DOCTOR &&
                                this.props.action === resources_controller.USER_MODAL_ACTION.insert) ||
                                parseInt(resources_controller.GetSession("role")) === resources_controller.USER_ROL_NUMBER.SUPER_USER)) ? (
                                <div className="col">
                                    <select
                                        className="browser-default custom-select www_select"
                                        name="role"
                                        value={this.props.form.role}
                                        onChange={this.props.onChange}
                                    >
                                        <option value="default" selected disabled>Escoge un Rol</option>
                                        {parseInt(resources_controller.GetSession("role")) === resources_controller.USER_ROL_NUMBER.SUPER_USER &&
                                            <React.Fragment>
                                                <option value="0">Super Usuario</option>
                                                <option value="1">Doctor</option>
                                                <option value="2">Paciente</option>
                                            </React.Fragment>
                                        }
                                        {parseInt(resources_controller.GetSession("role")) === resources_controller.USER_ROL_NUMBER.DOCTOR &&
                                            <React.Fragment>
                                                <option value="2">Paciente</option>
                                            </React.Fragment>
                                        }

                                    </select>
                                </div>
                            ) : (
                                null
                            )
                        }
                        <div className="col">
                            {this.props.action === resources_controller.USER_MODAL_ACTION.insert &&
                                <button onClick={() => resources_controller.getLocation()} type="button" className="btn btn-primary btn-block">Obtener Ubicacion</button>
                            }
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">

                            {this.props.action === resources_controller.USER_MODAL_ACTION.update &&
                                <button type="submit" className="btn btn_www btn-block">Actualizar usuario</button>
                            }
                            {this.props.action === resources_controller.USER_MODAL_ACTION.insert &&
                                <button type="submit" className="btn btn_www btn-block">Crear Usuario</button>
                            }
                        </div>
                    </div>
                </form>


            </Modal>
        )
    };
}
