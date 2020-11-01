import React, { Component } from 'react';
import axios from 'axios'
import socket from '../utils/Socket'
import resources_controller from '../resources/resources_controller'
import validations from '../resources/validations/main'

import Chat from '../components/Chat';

const config = require('../config/config');
export default class ChatContainer extends Component {
    state = {
        token: resources_controller.GetSession("token") === "" || resources_controller.GetSession("token") === null ? " " : resources_controller.GetSession("token"),
        loading: false,
        messages: [],
        friendList: [],
        conversation: {
            checked: false
        },
        mensajeActual: {
            content:"",
            conversation_id: 0,
            receiver_id:0,
            transmitter_id:0,
            ts_creation:new Date()
        },
        textArea: ""
    }

    async componentDidMount() {
        if (!sessionStorage.getItem("token")) {
            window.location.href = '/';
        } else {
            await this.getFriendList()
            socket.emit('connection', { row_id: parseInt(resources_controller.GetSession("row_id")) })

            socket.on('privateMessageError', (data) => {
                validations.ErrorToast(JSON.parse(data).description, JSON.parse(data).traza, JSON.parse(data).id);
            });

            socket.on('privateMessage', (data) => {
                validations.InfoToast(data.transmitter_name + ": " + data.content);
                let messagesJson = [...this.state.messages];
                const newMessage = {}
                newMessage.content = data.content
                newMessage.conversation_id = data.conversation_id
                newMessage.receiver_id = data.receiver_id
                newMessage.transmitter_id = data.transmitter_id
                newMessage.ts_creation = new Date()
                this.setState({ mensajeActual: newMessage })
                if(this.state.conversation.row_id === this.state.mensajeActual.conversation_id){
                    messagesJson.push(newMessage);
                }         
                this.setState({ messages: messagesJson })
            });
            return() =>{socket.off()}
        }
    }

    getMessages = async (conversation_id) => {
        try {
            const data = {
                conversation_id: conversation_id
            };
            const res = await axios.post(config.QUERY_SERVER_URI + `api/chat/user/getMessages`, data, {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': `Bearer ${this.state.token}`
                }
            });

            if (res.data.status === "error") {
                validations.ErrorToast(res.data.description, res.data.traza, res.data.id);
            } else {
                this.setState({
                    messages: res.data
                })
            }

        } catch (error) {
            validations.ErrorToast("Ha ocurrido un error", error.message)
        }
    }

    getFriendList = async () => {
        try {
            const data = {
                role: parseInt(resources_controller.GetSession("role")),
                row_id: parseInt(resources_controller.GetSession("row_id"))
            };
            const res = await axios.post(config.QUERY_SERVER_URI + `api/chat/user/getFriendList`, data, {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': `Bearer ${this.state.token}`
                }
            });

            if (res.data.status === "error") {
                validations.ErrorToast(res.data.description, res.data.traza, res.data.id);
            } else {
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

    getConversation = async (data) => {
        let objConversation = {};
        objConversation = data;
        objConversation.checked = true;
        this.setState({
            conversation: objConversation
        });
        await this.getMessages(data.row_id)
    }

    sendMessageEnter = async (e) => {
        if (e.keyCode === 13) {
            if (!e.shiftKey) {
                this.OnChangeTextArea(e)
                let messagesJson = [...this.state.messages];
                const message = {};
                message.content = this.state.textArea;
                message.conversation_id = parseInt(this.state.conversation.row_id);
                message.receiver_id = parseInt(this.state.conversation.receiver_id);
                message.transmitter_id = parseInt(resources_controller.GetSession("row_id"));
                message.transmitter_name = resources_controller.GetSession("name")
                message.ts_creation = new Date()
                messagesJson.push(message)
                this.setState({ messages: messagesJson })
                socket.emit('privateMessage', message);
                this.setState({textArea:""})
            }
        }

    }
    onSubmit = async (e) => {
        e.preventDefault();
        let messagesJson = [...this.state.messages];
        const message = {};
        message.content = this.state.textArea;
        message.conversation_id = parseInt(this.state.conversation.row_id);
        message.receiver_id = parseInt(this.state.conversation.receiver_id);
        message.transmitter_id = parseInt(resources_controller.GetSession("row_id"));
        message.transmitter_name = resources_controller.GetSession("name");
        message.ts_creation = new Date();
        messagesJson.push(message)
        this.setState({ messages: messagesJson })
        socket.emit('privateMessage', message);
        this.setState({textArea:""})
    }

    OnChangeTextArea = e => {
        this.setState({
            textArea: e.target.value,
        });
    };

    render() {
        return (
            <Chat
                friendList={this.state.friendList}
                messages={this.state.conversation.checked ? this.state.messages : []}
                sendMessageEnter={this.sendMessageEnter}
                onSubmit={this.onSubmit}
                getConversation={this.getConversation}
                conversation={this.state.conversation}
                newMessage={this.state.mensajeActual}
                OnChangeTextArea={this.OnChangeTextArea}
                textArea={this.state.textArea}
            />
        )
    }
}
