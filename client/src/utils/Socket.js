import io from 'socket.io-client';
import config from '../config/config';
import validations from '../resources/validations/main'
let socket
try {
    socket = io(config.SOCKET_SERVER_URI);
} catch (error) {
    validations.ErrorToast("Ha ocurrido un error", error.message)
}


export default socket;