import React, { useState, useEffect } from 'react';
import axios from 'axios'
import socket from '../utils/Socket'
import resources_controller from '../resources/resources_controller'
import validations from '../resources/validations/main'

import Chat from '../components/Chat';

const config = require('../config/config');

export default function ChatContainer() {
    const [token, setToken] = useState(resources_controller.GetSession("token") === "" || resources_controller.GetSession("token") === null ? " " : resources_controller.GetSession("token"))
    const [messages, setMessages] = useState([]);
    const [friendList, setfriendList] = useState([]);
    const [conversation, setConversation] = useState({});
    const [mensajeActual, setMensajeActual] = useState({});
    const [textArea, setTextArea] = useState("");
    const [emojiClick, setEmojiClick] = useState(false);

    useEffect(() => {
        if (!sessionStorage.getItem("token")) {
            window.location.href = '/';
        } else {
            const getFriendList = async () => {
                try {
                    const data = {
                        role: parseInt(resources_controller.GetSession("role")),
                        row_id: parseInt(resources_controller.GetSession("row_id"))
                    };
                    const res = await axios.post(config.QUERY_SERVER_URI + `api/chat/user/getFriendList`, data, {
                        headers: {
                            'Content-Type': 'application/json;charset=UTF-8',
                            'Authorization': `Bearer ${token}`
                        }
                    });
        
                    if (res.data.status === "error") {
                        validations.ErrorToast(res.data.description, res.data.traza, res.data.id);
                    } else {
                        setfriendList(res.data)
                    }
        
                } catch (error) {
                    validations.ErrorToast("Ha ocurrido un error", error.message)
                }
            }
            
            getFriendList()
        }
    }, [])

    useEffect(() => {
        socket.emit('connection', { row_id: parseInt(resources_controller.GetSession("row_id")) })

    }, [])

    useEffect(() => {
        socket.on('privateMessageError', (data) => {
            validations.ErrorToast(JSON.parse(data).description, JSON.parse(data).traza, JSON.parse(data).id);
        });

        return () => { socket.off() }
    }, [messages])

    useEffect(() => {
        socket.on('privateMessage', (data) => {
            validations.InfoToast(data.transmitter_name + ": " + data.content);
            data.ts_creation = new Date();
            if (conversation.row_id === data.conversation_id) {
                setMessages([...messages, data])
            }

        });
        return () => { socket.off() }
    }, [messages])

    const onOpenEmoji = () => {
        if (emojiClick) {
            setEmojiClick(false)
        } else {
            setEmojiClick(true)
        }

    }

    const onEmojiClick = (event, emojiObject) => {
        setTextArea(textArea + "" + emojiObject.emoji);
        document.getElementById("textarea").focus();
    }

    const getMessages = async (conversation_id) => {
        try {
            const data = {
                conversation_id: conversation_id
            };
            const res = await axios.post(config.QUERY_SERVER_URI + `api/chat/user/getMessages`, data, {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (res.data.status === "error") {
                validations.ErrorToast(res.data.description, res.data.traza, res.data.id);
            } else {
                setMessages(res.data)
            }

        } catch (error) {
            validations.ErrorToast("Ha ocurrido un error", error.message)
        }
    }

    const getConversation = async (data) => {
        let objConversation = {};
        objConversation = data;
        objConversation.checked = true;
        setConversation(objConversation);
        await getMessages(data.row_id)
    }

    const sendMessageEnter = async (e) => {
        if (!resources_controller.FieldIsBlank2(textArea)) {
            if (e.keyCode === 13) {
                if (!e.shiftKey) {
                    const message = {};
                    message.content = textArea;
                    message.conversation_id = parseInt(conversation.row_id);
                    message.receiver_id = parseInt(conversation.receiver_id);
                    message.transmitter_id = parseInt(resources_controller.GetSession("row_id"));
                    message.transmitter_name = resources_controller.GetSession("name")
                    message.ts_creation = new Date()
                    setMessages([...messages, message])
                    socket.emit('privateMessage', message);
                    setTextArea("")
                    setEmojiClick(false)
                }
            }
        }


    }
    const onSubmit = async (e) => {
        e.preventDefault();
        const message = {};
        message.content = textArea;
        message.conversation_id = parseInt(conversation.row_id);
        message.receiver_id = parseInt(conversation.receiver_id);
        message.transmitter_id = parseInt(resources_controller.GetSession("row_id"));
        message.transmitter_name = resources_controller.GetSession("name")
        message.ts_creation = new Date()
        setMessages([...messages, message])
        socket.emit('privateMessage', message);
        setTextArea("")
        setEmojiClick(false)
    }

    const OnChangeTextArea = e => {
        if (e.target.value != "\n") {
            setTextArea(e.target.value);
        }
        
    };

    return (
        <Chat
            friendList={friendList}
            messages={conversation.checked ? messages : []}
            sendMessageEnter={sendMessageEnter}
            onSubmit={onSubmit}
            getConversation={getConversation}
            conversation={conversation}
            newMessage={mensajeActual}
            OnChangeTextArea={OnChangeTextArea}
            textArea={textArea}

            emojiClick={emojiClick}
            onOpenEmoji={onOpenEmoji}
            onEmojiClick={onEmojiClick}
        />
    )

}

// export default ChatContainer;
