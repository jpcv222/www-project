import React, { useState, Component } from 'react';
import socket from '../utils/Socket'
import Chat from '../components/Chat'

export default class ChatContainer extends Component {
    componentDidMount(){
        socket.emit("conectado")
    }
    componentWillUnmount(){
        socket.emit("disconnect")
    }
    componentDidUpdate(){
        socket.emit("disconnect")
    }
    sendMessageEnter = async (e) => {
        if (e.keyCode == 13) {
            if (!e.shiftKey) {
                e.preventDefault();
                alert(e.target.value);
            }
        }

    }
    onSubmit = async(e) =>{
        e.preventDefault();
        alert("Submit")
    }

    state = {
        messages: [],
        friendList: {},
    }
    render() {
        return (
            <Chat
                friendList={this.state.friendList}
                messages={this.state.messages}
                sendMessageEnter={this.sendMessageEnter}
                onSubmit={this.onSubmit}
            />
        )
    }
}
