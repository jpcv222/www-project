const resources_controller = require('../resources/resources_controller');
const connection = require('../database/connection');


module.exports = function(io) {
    io.on('connection', socket => {
        socket.on('conectado', () => {
            console.log("usuario conectado");
        });
        socket.on('mensaje',(nombre, mensaje) =>{
            io.emit("mensajes",{mensaje});
        });
        
        socket.on('disconnect', ()=>{
            console.log('El usuario ha salido del chat')
        });
    });

}
