module.exports = function(callback){
    //Iniciamos chamando a biblioteca
var serialPort = require("serialport");
// Listamos todas as portas seriais conectadas
serialPort.list(function (err, ports) {
    ports.forEach(function (port) {
        // Imprimimos o nome de todas as portas
        console.log(port.comName);
        // Iniciamos uma conexão com cada porta para receber dados
        var Serialport = new serialPort.SerialPort(port.comName, {baudrate: 9600}, false);
        // Ao a porta abrir
        Serialport.open(function (error) {
            if (error) {
                // Se houver erros...
                console.log('failed to open: ' + error);
            } else {
                console.log('open');
                // Ao receber dados...
                Serialport.on('data', function (data) {
                    // Imprimimos os dados no terminal, criamos uma expressão regular para pegar somente os números
                    var re = /[0-9]+/;
                    var m;
                    if ((m = re.exec(data)) !== null) {
                        if (m.index === re.lastIndex) {
                            console.log(port.comName+': '+m[0]);
                            //se houver um callback (umafuncao de retorno) enviamos os dados para ele, no nosso caso o nosso servidor
                            if(callback){
                                callback({port:port.comName,data:m[0]});
                            }
                        }
                    }

                });
            }
        });
    });
});

}