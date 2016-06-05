module.exports = function(app){
    //recebemos a aplicacao principal e indicamos a rota principal com o html estatico
    app.get('/',function(req, res){
       res.sendFile('index.html',{root:__dirname+'/../views/'});
    });
}