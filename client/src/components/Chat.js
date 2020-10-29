import React, { Component } from 'react'
import './styles/Chat.css'
import { MDBIcon, MDBTooltip, MDBInputGroup, MDBBtn } from "mdbreact";
export default class Chat extends Component {

    render() {
        return (
            <div>
                <div className="row" >
                    <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 padding-0">
                        <div className="chat_header list-group-item" id="chat_header">
                            Conversaciones
                            {/* <div className="float-right" style={{ cursor: "pointer" }}>
                                <MDBTooltip
                                    domElement
                                    tag="span"
                                    placement="left"
                                >
                                    <span className="badge badge-pill badge_mas"
                                    >
                                        <MDBIcon icon="plus" size="2x" />
                                    </span>
                                    <span>Crear conversación</span>
                                </MDBTooltip>
                            </div> */}
                        </div>
                        <div className="friendList">
                            <ul class="list-group">
                                <li className="list-group-item">
                                    Nombre chat
                                    <div className="float-right">
                                        <small class="text-muted">hora</small>
                                    </div>
                                </li>

                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12 padding-0">
                        <div className="chat_header text-center list-group-item" id="chat_header">
                            hjsfjhsfjh
                        </div>
                        <div className="container p-5 msg_container">

                            <div className="row">
                                <div className={true ? "msg_recibido" : "msg_enviado"}>
                                    <div className="col text-right">
                                        <small class="text-muted">hora</small>
                                    </div>
                                    <div className="col">
                                        mensaje
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className={false ? "msg_recibido" : "msg_enviado"}>
                                    <div className="col text-right">
                                        <small class="text-muted">hora</small>
                                    </div>
                                    <div className="col">
                                        mensaje
                                    </div>
                                </div>
                            </div>


                        </div>
                        <form onSubmit={this.props.onSubmit}>
                            <MDBInputGroup
                                material
                                containerClassName="mb-3 mt-0"
                                hint="Escribe un mensaje..."
                                type="textarea"
                                onKeyUp={this.props.sendMessageEnter}
                                append={
                                    <MDBBtn
                                        color="primary"
                                        className="m-0 px-3 py-2 z-depth-0"
                                        type="submit"
                                    >
                                        <MDBIcon icon="paper-plane" size="2x" />
                                    </MDBBtn>
                                }
                            />
                        </form>

                    </div>
                </div>
            </div>
        )
    }
}
