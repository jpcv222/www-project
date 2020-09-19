const express = require('express');
const cors = require('cors');
const config = require('./config/config')
const app = express();

app.use(cors(config.application.cors.server));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//ROUTES
app.use('/api/user/auth', require('./routes/auth'));

//SETTINGS
app.set('port', config.API_PORT || 4000);

module.exports = app;