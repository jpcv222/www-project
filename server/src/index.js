const app = require('./app');

function main() {
    // app.listen(app.get('port'));
    app.get('server').listen(app.get('port'));
    console.log(`Server with sockets on port ${app.get('port')}`);
}
main();