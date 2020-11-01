const cors = require('cors');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const config = require('./config/config')
require('./controllers/socket_controller')(io);


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
app.use(require('./middlewares/auth_token'));
app.use('/api/user/auth', require('./routes/auth'));
app.use('/api/user/manage', require('./routes/user_manage'));
app.use('/api/chat/user', require('./routes/chat'));

//SETTINGS
app.set('port', config.API_PORT || 4000);
app.set('socketIo', io);
app.set('server', server);

module.exports = app;