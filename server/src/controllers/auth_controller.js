const authController = {};
const resources_controller = require('../resources/resources_controller');
const connection = require('../database/connection');


authController.auth = async (req, res) => {
    try {
        let io = req.app.get('socketIo');
        let query = {
            text: "select ($1) prueba",
            values: [1]
        };

        await connection.connect(async (err, client, done) => {
            try {
                if (err) {
                    res.json(resources_controller.leerRecurso(1000, err.message));
                } else {
                    await client.query(query, async (err, result) => {
                        if (err) {
                            await client.query("ROLLBACK");
                            res.json(resources_controller.leerRecurso(1000, err.message));
                        } else {
                            res.json(result.rows);
                        }
                    });
                }
            } catch (error) {                
                await client.query("ROLLBACK");
                res.json(resources_controller.leerRecurso(1000, error.message));
            } finally {
                done();
                query = {};
                io = "";
            }
        });
    } catch (error) {
        res.json(resources_controller.leerRecurso(1000, error.message));
    }
}



module.exports = authController;