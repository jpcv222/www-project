import io from 'socket.io-client';
import config from '../config/config'

let socket = io(config.SOCKET_SERVER_URI);

export default socket;