// Inicializamos as bibliotecas que iremos utilizar para o primeiro exemplo
var http = require('http'),
    express = require('express'),
    app = express(),
    path = require('path');
var server = http.Server(app);
var io = require('socket.io')(server);
// Incluimos a biblioteca que pega os dados do hardware
var serial = require('./lib/serial');
// Quando o browser conectar
io.on('connection',function(socket){
    //chamamos a biblioteca do serial
    serial(function(data){
        // e enviamos para o browser
        socket.emit('data',data);
    });
});
// Setamos a pasta public como estatica para css, js, etc...
app.use(express.static('public'));
// Chamamos a pasta de views
app.set('views', path.join(__dirname, 'views'));
// chamamos as rotas e injetamos a aplicacao nela
require('./routes/routes')(app);
// Iniciamos o servidor
server.listen(3000,function() {
 console.log('Express server listening on port ' + server.address().port);
});