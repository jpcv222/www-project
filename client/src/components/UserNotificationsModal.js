import React, { Component } from 'react'
import Modal from "./GenericModal";
import { MDBIcon, MDBTooltip } from "mdbreact";

import resources_controller from '../resources/resources_controller'

import './styles/UserNotificationsModal.css'

export default class UserNotificationsModal extends Component {
    render() {
        return (
            <Modal
                title={this.props.title}
                show={this.props.show}
                onHide={this.props.onHide}
            >
                <div className="notifications_container">
                    <div className="friendList">
                        <ul class="list-group">
                            {this.props.notifications.map(notification => (
                                <li className={notification.seen_ind === 0 ? "list-group-item unread" : "list-group-item"} key={notification.row_id}>
                                    {notification.content}
                                    <div className="float-right">
                                        <small class="text-muted notification_date">
                                            {resources_controller.FormatDateAMPM(notification.ts_creation)}
                                        </small>

                                        {notification.seen_ind === 0 &&
                                            <MDBTooltip domElement tag="p" placement="left">
                                                <span onClick={() => this.props.markAsSeenNotification(notification.row_id)} className="badge badge-pill badge_mas" style={{ cursor: "pointer" }}>
                                                    <MDBIcon icon="eye" size="1x" />
                                                </span>
                                            
                                                <p>Marcar como leida</p>
                                            </MDBTooltip>
                                        }

                                    </div>
                                </li>
                            ))
                            }
                        </ul>
                    </div>
                </div>
            </Modal>
        )
    }
}
