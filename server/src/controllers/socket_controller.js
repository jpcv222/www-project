const resources_controller = require('../resources/resources_controller');
const connection = require('../database/connection');

let connectedUsers = {};

module.exports = function (io) {
    io.on('connection', socket => {

        socket.on('connection', (data) => {
            connectedUsers[data.row_id] = socket;
        })

        socket.on('privateMessage', async (data) => {
            if (connectedUsers[data.receiver_id]) {               
                connectedUsers[data.receiver_id].emit('privateMessage', data);
                // se guarda el msg en bd
                await this.insertMessage(data, socket)
            } else {
                console.log("no esta conectado ese usuario")
                // se guarda el msg en bd
                await this.insertMessage(data, socket)
            }

        });
    });

    insertMessage = async (data, socket) => {
        try {
            await connection.connect(async (err, client, done) => {
                try {
                    let query = {
                        text: "select * from f_insert_message($1)",
                        values: [data]
                    };
                    if (err) {
                        socket.emit('privateMessageError', JSON.stringify(resources_controller.leerRecurso(1029, err.message)));
                    } else {
                        await client.query(query, async (err, results) => {
                            if (!err) {
                                console.log("mensaje guardado con exito")
                            } else {
                                await client.query("ROLLBACK");
                                socket.emit('privateMessageError', JSON.stringify(resources_controller.leerRecurso(1029, err.message)));
                            }
                        });
                    }
                } finally {
                    done();
                    query = {}
                }
            });
        } catch (error) {
            await client.query("ROLLBACK");
            socket.emit('privateMessageError', JSON.stringify(resources_controller.leerRecurso(1029, error.message)));
        }
    }

}
