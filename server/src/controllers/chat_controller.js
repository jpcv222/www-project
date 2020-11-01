const chat_controller = {};
const resources_controller = require('../resources/resources_controller');
const connection = require('../database/connection');

chat_controller.getFriendList = async (req, res) => {
    // const io = req.app.get('socketIo');
    try {
        await connection.connect(async (err, client, done) => {
            try {
                let query = {
                    text: "select * from f_get_chat_friend_list($1,$2)",
                    values: [req.body.role, req.body.row_id]
                };
                if (err) {
                    res.json(resources_controller.leerRecurso(1028, err.message));
                } else {
                    await client.query(query, async (err, results) => {
                        if (!err) {
                            res.status(200).json(results.rows);
                        } else {
                            await client.query("ROLLBACK");
                            res.json(resources_controller.leerRecurso(1028, err.message));
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
        res.json(resources_controller.leerRecurso(1028, error.message));
    }

}

chat_controller.getMessages = async (req, res) => {
    // const io = req.app.get('socketIo');
    try {
        await connection.connect(async (err, client, done) => {
            try {
                let query = {
                    text: "select * from f_get_conversation_msg($1)",
                    values: [req.body.conversation_id]
                };
                if (err) {
                    res.json(resources_controller.leerRecurso(1030, err.message));
                } else {
                    await client.query(query, async (err, results) => {
                        if (!err) {
                            res.status(200).json(results.rows);
                        } else {
                            await client.query("ROLLBACK");
                            res.json(resources_controller.leerRecurso(1030, err.message));
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
        res.json(resources_controller.leerRecurso(1030, error.message));
    }

}



module.exports = chat_controller;