import React, { Component } from 'react'
import Modal from "./GenericModal";
import './styles/UpdateReadUserModal.css'
import { MDBInput } from "mdbreact";
import resources_controller from '../resources/resources_controller'


export default class UpdateUserModal extends Component {
    render() {
        return (
            <Modal
                title={this.props.title}
                show={this.props.show}
                onHide={this.props.onHide}
            >

                <form onSubmit={this.props.handleAssingPatient}>

                    <div className="row">
                        <div className="col">
                            <MDBInput
                                label="Identificacion"
                                name="identificationAssing"
                                type="number"
                                value={this.props.identificationAssing}
                                onChange={this.props.handleChangeAssing}

                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <button type="submit" className="btn btn_www btn-block">Asignar paciente</button>
                        </div>
                    </div>
                </form>


            </Modal>
        )
    };
}
