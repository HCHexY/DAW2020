// Criação do servidor

var http = require('http');
var axios = require('axios');
var fs = require('fs');
var static = require('./static');

var galunoServer = http.createServer(function (req, res) {
    // Logger: que pedido chegou e quando
    var d = new Date().toISOString().substr(0, 16)
    if(static.recursoEstatico(req)) static.sirvoRecursoEstatico(req,res);
    console.log(req.method + " " + req.url + " " + d)
    
    if(req.url == "/") {
                axios.get("http://localhost:3001/tasks")
                    .then(response => {
                        const data =response.data;
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write(genBaseHtml(data))
                        res.end()
                    })
                    .catch(erro => {
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write('<p>Erro: ' + erro + '</p>')
                        res.write('<p><a href="/">Voltar</a></p>')
                        res.end()
                    })
                
                    }

            
            }).listen(7777);
console.log("Server up at port 7777");



function  genBaseHtml(tasks){
    var done =[];
    var todo =[];
    tasks.forEach(e=>{
        if(e.done) done.push(e);
        else todo.push(e);
    })
    var ret=     `
    <html>
    <head>

    <link rel="stylesheet" href="w3.css" />
    <link rel="stylesheet" href="myCss.css" />
    <title>Task Manager</title>
    </head>
    <body>
    
    <h2>Task Manager</h2>
    <div class="w3-row">
    <div class="w3-col s4" > ${genForm()}</div>
    

    
    <div class="w3-col s8" >
    <h3>Tasks TO-DO</h3>
    <table class="w3-table w3-bordered">
    <tr>
    <th>Type</th>
    <th>Date Created</th>
    <th>Date Due</th>
    <th>Who</th>
    <th>What</th>
    </tr>
    
    ${printTable(todo)}
    </tr>
    </table></div>
    
    </div>
    <div class="w3-row">
        <h3>DONE</h3>
    <div class="w3-col s4" ><table class="w3-table w3-bordered">
    <tr>
    <th>Type</th>
    <th>Date Created</th>
    <th>Date Due</th>
    <th>Who</th>
    <th>What</th>
    </tr>
    
    ${printTable(done)}
    </tr>
    </table></div>
    </div>
    </body>
    </html>`
    return ret;
}
function genForm(){
    return "TO-DO : FORM"
}
function printTable(tasks){
    var ret = "";
    tasks.forEach(e =>{
        ret+=
        `<tr>
        <td>${e.type}</td>
        <td>${e.dateCreated}</td>
        <td>${e.dateDue}</td>
        <td>${e.who}</td>
        <td>${e.what}</td>
        </tr> `
    });
    return(ret);
}