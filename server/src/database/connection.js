const { Pool } = require('pg');
const config = require('../config/config')
let connectionObj = {}

if (config.DB_CREDENTIALS.SSL) {
    with(connectionObj){
        user = config.DB_CREDENTIALS.USER_NAME,
        host= config.DB_CREDENTIALS.HOST_NAME,
        database= config.DB_CREDENTIALS.DATABASE_NAME,
        password= config.DB_CREDENTIALS.PASSWORD,
        port= config.DB_CREDENTIALS.DB_PORT,
        ssl= true
    }   
}else{
    with(connectionObj){
        user = config.DB_CREDENTIALS.USER_NAME,
        host= config.DB_CREDENTIALS.HOST_NAME,
        database= config.DB_CREDENTIALS.DATABASE_NAME,
        password= config.DB_CREDENTIALS.PASSWORD,
        port= config.DB_CREDENTIALS.DB_PORT
    }
}


const connection = new Pool(
    connectionObj
);

connection.connect(function (err) {
    if (err) {
        console.log('Falló la conexion a la base de datos, Traza: ' + err.message);
    } else {
        console.log('Conexion a base de datos exitosa');
    }
});

module.exports = connection;