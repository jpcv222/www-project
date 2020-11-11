import React, { useEffect, useRef } from 'react'
import './styles/Chat.css'
import { MDBIcon, MDBTooltip, MDBInputGroup, MDBBtn } from "mdbreact";
import resources_controller from '../resources/resources_controller'
import { format, register } from 'timeago.js';

register('es_ES', resources_controller.localeFunc);
const Chat = (props) => {

    const divRef = useRef(null);
    useEffect(() => {
        divRef.current.scrollIntoView({ behavior: 'smooth' })
    },[props.messages])

    return (
        <div className="mt-5">
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
                            {
                                props.friendList.map(friend => (
                                    <li onClick={() => props.getConversation(friend)} className="list-group-item" key={friend.row_id} style={{ cursor: "pointer" }}>
                                        {friend.conversation_name}
                                        <div className="float-right">
                                            <small class="text-muted">{resources_controller.FormatDateAMPM(friend.ts_creation)}</small>
                                        </div>
                                    </li>
                                ))
                            }

                        </ul>
                    </div>
                </div>
                <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12 padding-0">
                    <div className="chat_header text-center list-group-item" id="chat_header">
                        {props.conversation.conversation_name}
                    </div>
                    <div className="container p-5 msg_container">
                        {props.messages.map(message => (

                            <div className="row" key={message.row_id}>
                                <div className={message.transmitter_id === parseInt(resources_controller.GetSession("row_id")) ? "msg_enviado" : "msg_recibido"}>
                                    <div className="col text-right">
                                        {/* <small class="text-muted">{format(message.ts_creation, 'es_ES')}</small> */}
                                        <small class="text-muted">{resources_controller.FormatDateAMPM(message.ts_creation)}</small>
                                        
                                    </div>
                                    <div className="col">
                                        <p className="content_msg">
                                        {message.content}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                        }
                        <div ref={divRef}></div>

                    </div>

                    {props.conversation.checked &&
                        <form onSubmit={props.onSubmit}>
                            <MDBInputGroup
                                material
                                containerClassName="mb-3 mt-0"
                                hint="Escribe un mensaje..."
                                type="textarea"
                                onKeyUp={props.sendMessageEnter}
                                value={props.textArea}
                                onChange={props.OnChangeTextArea}
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
                    }


                </div>
            </div>
        </div>
    )

}

export default Chat;
