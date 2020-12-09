const userController = {};
const resources_controller = require('../resources/resources_controller');
const connection = require('../database/connection');

userController.getUsers = async (req, res) => {
    try {
        let query = {
            text: `SELECT * FROM f_get_users($1,$2) `,
            values: [req.body.role, req.body.row_id]
        };
        await connection.connect(async (err, client, done) => {
            try {
                if (err) {
                    res.json(resources_controller.leerRecurso(1011, err.message));
                } else {
                    await client.query(query, async (err, results) => {
                        if (err) {
                            await client.query("ROLLBACK");
                            res.json(resources_controller.leerRecurso(1011, err.message));
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
        res.json(resources_controller.leerRecurso(1011, error.message));
    }
}

userController.createUser = async (req, res) => {
    try {
        console.log(req.body)
        if (resources_controller.validarIdentification(req.body.identification)) {
            await connection.connect(async (err, client, done) => {
                try {
                    let queryValidarUsuario = {
                        text: "select * from f_validate_insert_user($1,$2)",
                        values: [req.body.identification, req.body.email]
                    };
                    if (err) {
                        res.json(resources_controller.leerRecurso(1003, err.message));
                    } else {
                        await client.query(queryValidarUsuario, async (err, results) => {
                            if (!err) {
                                const estadoUsuario = results.rows[0].f_validate_insert_user;
                                if (estadoUsuario === resources_controller.ESTADO_USUARIO.IDENTIFICATION_EXISTE) {
                                    res.json(resources_controller.leerRecurso(1004));
                                } else if (estadoUsuario === resources_controller.ESTADO_USUARIO.EMAIL_EXISTE) {
                                    res.json(resources_controller.leerRecurso(1012));
                                } else {
                                    query = {
                                        text: "select * from f_insert_user($1)",
                                        values: [req.body]
                                    };
                                    client.query(query, async (err, results) => {
                                        if (!err) {
                                            res.json(resources_controller.leerRecurso(1002));

                                        } else {
                                            await client.query("ROLLBACK");
                                            res.json(resources_controller.leerRecurso(1003, err.message));
                                            console.log(err)
                                        }
                                    });
                                }
                            } else {
                                await client.query("ROLLBACK");
                                res.json(resources_controller.leerRecurso(1003, err.message));
                                console.log(err)
                            }
                        });
                    }
                } finally {
                    done();
                    queryValidarUsuario = {}
                }
            });
        } else {
            res.json(resources_controller.leerRecurso(1013));
        }
    } catch (error) {
        await client.query("ROLLBACK");
        res.json(resources_controller.leerRecurso(1003, error.message));
        console.log(error)
    }
}

userController.assignPatient = async (req, res) => {
    try {
        if (resources_controller.validarIdentification(req.body.identification_patient)) {
            await connection.connect(async (err, client, done) => {
                try {
                    let queryValidarUsuario = {
                        text: "select * from f_validate_assign_patient($1,$2)",
                        values: [req.body.row_id_doctor, req.body.identification_patient]
                    };
                    if (err) {
                        res.json(resources_controller.leerRecurso(1014, err.message));
                    } else {
                        await client.query(queryValidarUsuario, async (err, results) => {
                            if (!err) {
                                const estadoUsuario = results.rows[0].f_validate_assign_patient;

                                if (estadoUsuario === resources_controller.ESTADO_USUARIO.IDENTIFICATION_EXISTE) {
                                    query = {
                                        text: "select * from f_assign_patient($1,$2)",
                                        values: [req.body.row_id_doctor, req.body.identification_patient]
                                    };
                                    client.query(query, async (err, results) => {
                                        if (!err) {
                                            res.json(resources_controller.leerRecurso(1016));

                                        } else {
                                            await client.query("ROLLBACK");
                                            res.json(resources_controller.leerRecurso(1014, err.message));
                                        }
                                    });

                                } else if (estadoUsuario === resources_controller.ESTADO_USUARIO.YA_ASIGNADO) {
                                    res.json(resources_controller.leerRecurso(1017));
                                } else {
                                    res.json(resources_controller.leerRecurso(1015));
                                }
                            } else {
                                await client.query("ROLLBACK");
                                res.json(resources_controller.leerRecurso(1014, err.message));
                            }
                        });
                    }
                } finally {
                    done();
                    queryValidarUsuario = {}
                }
            });
        } else {
            res.json(resources_controller.leerRecurso(1013));
        }
    } catch (error) {
        await client.query("ROLLBACK");
        res.json(resources_controller.leerRecurso(1014, error.message));
    }
}

userController.updateUser = async (req, res) => {
    try {
        if (resources_controller.validarIdentification(req.body.identification)) {
            await connection.connect(async (err, client, done) => {
                try {
                    let queryValidarUsuario = {
                        text: "select * from f_validate_update_user($1,$2,$3)",
                        values: [req.body.identification, req.body.email, req.params.id]
                    };
                    if (err) {
                        res.json(resources_controller.leerRecurso(1018, err.message));
                    } else {
                        await client.query(queryValidarUsuario, async (err, results) => {
                            if (!err) {
                                const estadoUsuario = results.rows[0].f_validate_update_user;
                                if (estadoUsuario === resources_controller.ESTADO_USUARIO.IDENTIFICATION_EXISTE) {
                                    res.json(resources_controller.leerRecurso(1004));
                                } else if (estadoUsuario === resources_controller.ESTADO_USUARIO.EMAIL_EXISTE) {
                                    res.json(resources_controller.leerRecurso(1012));
                                } else {
                                    query = {
                                        text: "select * from f_update_user($1,$2)",
                                        values: [req.body, req.params.id]
                                    };
                                    client.query(query, async (err, results) => {
                                        if (!err) {
                                            res.json(resources_controller.leerRecurso(1019));

                                        } else {
                                            await client.query("ROLLBACK");
                                            res.json(resources_controller.leerRecurso(1018, err.message));
                                            console.log(err)
                                        }
                                    });
                                }
                            } else {
                                await client.query("ROLLBACK");
                                res.json(resources_controller.leerRecurso(1018, err.message));
                                console.log(err)
                            }
                        });
                    }
                } finally {
                    done();
                    queryValidarUsuario = {}
                }
            });
        } else {
            res.json(resources_controller.leerRecurso(1013));
        }
    } catch (error) {
        await client.query("ROLLBACK");
        res.json(resources_controller.leerRecurso(1018, error.message));
        console.log(error)
    }
}

userController.enableUser = async (req, res) => {
    try {
        await connection.connect(async (err, client, done) => {
            try {
                let query = {
                    text: "select * from f_enable_user($1)",
                    values: [req.params.id]
                };
                if (err) {
                    res.json(resources_controller.leerRecurso(1023, err.message));
                } else {
                    await client.query(query, async (err, results) => {
                        if (!err) {
                            res.json(resources_controller.leerRecurso(1021));
                        } else {
                            await client.query("ROLLBACK");
                            res.json(resources_controller.leerRecurso(1023, err.message));
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
        res.json(resources_controller.leerRecurso(1023, error.message));
    }
}

userController.disableUser = async (req, res) => {
    try {
        await connection.connect(async (err, client, done) => {
            try {
                let query = {
                    text: "select * from f_disable_user($1)",
                    values: [req.params.id]
                };
                if (err) {
                    res.json(resources_controller.leerRecurso(1022, err.message));
                } else {
                    await client.query(query, async (err, results) => {
                        if (!err) {
                            res.json(resources_controller.leerRecurso(1020));
                        } else {
                            await client.query("ROLLBACK");
                            res.json(resources_controller.leerRecurso(1022, err.message));
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
        res.json(resources_controller.leerRecurso(1022, error.message));
    }
}

userController.updatePassword = async (req, res) => {
    try {
        await connection.connect(async (err, client, done) => {
            try {
                let query = {
                    text: "select * from f_update_user_password($1, $2)",
                    values: [req.params.id, req.body.password]
                };
                if (err) {
                    res.json(resources_controller.leerRecurso(1024, err.message));
                } else {
                    await client.query(query, async (err, results) => {
                        if (!err) {
                            res.json(resources_controller.leerRecurso(1025));
                        } else {
                            await client.query("ROLLBACK");
                            res.json(resources_controller.leerRecurso(1024, err.message));
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
        res.json(resources_controller.leerRecurso(1024, error.message));
    }
}

userController.updateLocation = async (req, res) => {
    try {
        await connection.connect(async (err, client, done) => {
            try {
                let query = {
                    text: "select * from f_update_user_location($1, $2, $3)",
                    values: [req.params.id, req.body.house_longitude, req.body.house_latitude]
                };
                if (err) {
                    res.json(resources_controller.leerRecurso(1027, err.message));
                } else {
                    await client.query(query, async (err, results) => {
                        if (!err) {
                            res.json(resources_controller.leerRecurso(1026));
                        } else {
                            await client.query("ROLLBACK");
                            res.json(resources_controller.leerRecurso(1027, err.message));
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
        res.json(resources_controller.leerRecurso(1027, error.message));
    }
}

userController.getPatientsLocations = async (req, res) => {
    try {
        let query = {
            text: `SELECT * FROM f_get_users_locations($1,$2) `,
            values: [req.body.role, req.body.row_id]
        };
        await connection.connect(async (err, client, done) => {
            try {
                if (err) {
                    res.json(resources_controller.leerRecurso(1031, err.message));
                } else {
                    await client.query(query, async (err, results) => {
                        if (err) {
                            await client.query("ROLLBACK");
                            res.json(resources_controller.leerRecurso(1031, err.message));
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
        res.json(resources_controller.leerRecurso(1031, error.message));
    }
}

userController.getLogs = async (req, res) => {
    try {
        let query = {
            text: `SELECT * FROM f_get_users_logs()`
        };
        await connection.connect(async (err, client, done) => {
            try {
                if (err) {
                    res.json(resources_controller.leerRecurso(1035, err.message));
                } else {
                    await client.query(query, async (err, results) => {
                        if (err) {
                            await client.query("ROLLBACK");
                            res.json(resources_controller.leerRecurso(1035, err.message));
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
        res.json(resources_controller.leerRecurso(1035, error.message));
    }
}

userController.getAllLogs = async (req, res) => {
    try {
        let query = {
            text: `SELECT * FROM f_get_all_logs()`
        };
        await connection.connect(async (err, client, done) => {
            try {
                if (err) {
                    res.json(resources_controller.leerRecurso(1035, err.message));
                } else {
                    await client.query(query, async (err, results) => {
                        if (err) {
                            await client.query("ROLLBACK");
                            res.json(resources_controller.leerRecurso(1035, err.message));
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
        res.json(resources_controller.leerRecurso(1035, error.message));
    }
}

userController.getAllAlerts = async (req, res) => {
    try {
        let query = {
            text: `SELECT * FROM f_get_all_alerts()`
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

module.exports = userController;