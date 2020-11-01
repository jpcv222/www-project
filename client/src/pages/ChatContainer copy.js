import React, { Component } from 'react';
import axios from 'axios'
import socket from '../utils/Socket'
import resources_controller from '../resources/resources_controller'
import validations from '../resources/validations/main'

import Chat from '../components/Chat';
import Loading from './Loading';

const config = require('../config/config');
export default class ChatContainer extends Component {
    state = {
        token: resources_controller.GetSession("token") === "" || resources_controller.GetSession("token") === null ? " " : resources_controller.GetSession("token"),
        loading: false,
        messages: [],
        friendList: [],
        conversation: {},
        mensajeEnviado:{}
    }

    async componentDidMount() {
        if (!sessionStorage.getItem("token")) {
            window.location.href = '/';
        } else {
            await this.getFriendList()
            socket.emit('connection',{row_id: parseInt(resources_controller.GetSession("row_id"))})
            // this.getFriendListSocket()
        }
    }

    getFriendList = async() => {
        try {
            const data = {
                role: parseInt(resources_controller.GetSession("role")),
                row_id: parseInt(resources_controller.GetSession("row_id"))
            };           
            this.setState({ loading: true });
            const res = await axios.post(config.QUERY_SERVER_URI + `api/chat/user/getFriendList`, data, {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': `Bearer ${this.state.token}`
                }
            });

            if (res.data.status === "error") {
                this.setState({
                    loading: false
                });
                validations.ErrorToast(res.data.description, res.data.traza, res.data.id);
            } else {
                this.setState({
                    loading: false, 
                });
                this.setState({
                    friendList: res.data
                })
            }

        } catch (error) {
            this.setState({
                loading: false
            });
            validations.ErrorToast("Ha ocurrido un error", error.message)
        }
    }

    getFriendListSocket = () => {
        try {
            const data = {
                role: parseInt(resources_controller.GetSession("role")),
                row_id: parseInt(resources_controller.GetSession("row_id"))
            };
            socket.emit("GetFriendList", data);
            socket.on('GetFriendList', (data) => {
                if (data.status === "error") {
                    validations.ErrorToast(data.description, data.traza, data.id);
                } else {
                    this.setState({
                        friendList: JSON.parse(data)
                    })
                }

            })
        } catch (error) {
            validations.ErrorToast("Ha ocurrido un error", error.message)
        }

    }

    getMessagesSocket = (data) => {
        try {
            const conversation = data;
            conversation.transmitter_id = parseInt(resources_controller.GetSession("row_id"));
            socket.emit("getMessages", conversation);
        } catch (error) {
            validations.ErrorToast("Ha ocurrido un error", error.message)
        }
    }
    getConversation = (data) => {
        this.setState({
            conversation: data
        });
        this.getMessagesSocket(data);
    }

    sendMessageEnter = async (e) => {
        if (e.keyCode === 13) {
            if (!e.shiftKey) {
                e.preventDefault();
                const data = {};
                data.message = e.target.value
                data.receiver_id = this.state.conversation.receiver_id
                alert(data);
                socket.emit('privateMessage',data);
                socket.on('privateMessage',(data)=>{
                    alert(data.message)
                    this.setState({
                        ...this.state.messages,
                        messages: JSON.parse({message:data.message})
                    })
                });
            }
        }

    }
    onSubmit = async (e) => {
        e.preventDefault();
        alert("Submit")
    }

    render() {
        return (
            <Chat
                friendList={this.state.friendList}
                messages={this.state.messages}
                sendMessageEnter={this.sendMessageEnter}
                onSubmit={this.onSubmit}
                getConversation={this.getConversation}
                conversation={this.state.conversation}
            />
        )
    }
}
