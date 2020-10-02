const { Pool } = require('pg');
const config = require('../config/config')

const connection = new Pool(
    config.DB_CREDENTIALS.HEROKU
);

module.exports = connection;