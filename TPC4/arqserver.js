var http= require('http'); //Carregar modulo http
var url = require('url');
var fs = require('fs');
const { waitForDebugger } = require('inspector');
const { SSL_OP_EPHEMERAL_RSA } = require('constants');
const { Console } = require('console');


http.createServer(function (req,res){ //Criar um servidor com uma funçao
    
    res.writeHead(200,{'ContentType':'text/html; charset=utf-8'});
    console.log(req.method+ " "+req.url)
    if(req.url.match(/arqs\/[0-9]+$/)){
        var splitter =req.url.split("/");
        var num =  splitter[splitter.length-1];
    
        var pat = "./site/arq"+num+".html";
        console.log(pat);
    fs.readFile(pat, function(err,data){
    res.write(data);
    res.end();
    })
    }else{

        if(req.url.match(/\/arq/)||req.url.match(/\/index(.html)?/)){

            fs.readFile("site/index.html",function(err,data){res.write(data);res.end()})

        }else{
        res.write("<p>BROKEN URL</p>");
        res.end();
    }
}
}).listen(7777);                      //Porta do servidor
console.log("Server running on port 7777");



