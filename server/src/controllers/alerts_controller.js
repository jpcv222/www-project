const alerts_controller = {};
const resources_controller = require('../resources/resources_controller');
const connection = require('../database/connection');

alerts_controller.getAlerts = async (req, res) => {
    try {
        let query = {
            text: `SELECT * FROM f_get_alerts($1,$2) `,
            values: [req.body.role, req.body.row_id]
        };
        await connection.connect(async (err, client, done) => {
            try {
                if (err) {
                    res.json(resources_controller.leerRecurso(1032, err.message));
                } else {
                    await client.query(query, async (err, results) => {
                        if (err) {
                            await client.query("ROLLBACK");
                            res.json(resources_controller.leerRecurso(1032, err.message));
                        } else {

                            res.status(200).json(results.rows);

                        }
                    });
                }
            } finally {
                done();
                query = {};
            }
        });

    } catch (error) {
        res.json(resources_controller.leerRecurso(1032, error.message));
    }
}

alerts_controller.markAsSeen = async (req, res) => {
    try {
        let query = {
            text: `SELECT * FROM f_mark_seen_notification($1) `,
            values: [req.body.rowid]
        };
        await connection.connect(async (err, client, done) => {
            try {
                if (err) {
                    res.json(resources_controller.leerRecurso(1033, err.message));
                } else {
                    await client.query(query, async (err, results) => {
                        if (err) {
                            await client.query("ROLLBACK");
                            res.json(resources_controller.leerRecurso(1033, err.message));
                        } else {
                            res.json(resources_controller.leerRecurso(1034));
                            console.log("notificacion marcada como leida con exito");
                        }
                    });
                }
            } finally {
                done();
                query = {};
            }
        });

    } catch (error) {
        res.json(resources_controller.leerRecurso(1033, error.message));
    }
}

alerts_controller.getCount = async (req, res) => {
    try {
        let query = {
            text: `SELECT * FROM get_notifications_count($1) `,
            values: [req.body.rowid_user]
        };
        await connection.connect(async (err, client, done) => {
            try {
                if (err) {
                    res.json(resources_controller.leerRecurso(1032, err.message));
                } else {
                    await client.query(query, async (err, results) => {
                        if (err) {
                            await client.query("ROLLBACK");
                            res.json(resources_controller.leerRecurso(1032, err.message));
                        } else {
                            res.json({ notificationsCount: results.rows[0].get_notifications_count })
                        }
                    });
                }
            } finally {
                done();
                query = {};
            }
        });

    } catch (error) {
        res.json(resources_controller.leerRecurso(1032, error.message));
    }
}

module.exports = alerts_controller;