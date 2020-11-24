// Criação do servidor

var http = require('http');
var axios = require('axios');
var fs = require('fs');
var static = require('./static');

var {parse} = require('querystring')

var galunoServer = http.createServer(function (req, res) {
    // Logger: que pedido chegou e quando
    var d = new Date().toISOString().substr(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    if(static.recursoEstatico(req)) static.sirvoRecursoEstatico(req,res);
    else{console.log("NotStatic |^|");


     if(req.url == "/") {
        if(req.method=="POST"){

            
            recuperaInfo(req, resultado => {
                var ob= resultado.todoOrderBy==undefined? "" : "?_sort="+resultado.todoOrderBy;
                ob += resultado.orderHow==undefined? "" : "&_order="+resultado.orderHow;
                //console.log("Form Type :=====:"+resultado.formType)
                console.log('Form da task:' + JSON.stringify(resultado))
                console.log('Ob:' + ob)
                
                if(resultado.formType=="newTask"){
                    delete resultado.formType;
                    resultado.dateCreated=new Date().toISOString().substr(0, 10).replace(/\-/g,'/');
                    axios.post('http://localhost:3001/tasks', resultado)
                    .then(resp=>{
                        if(resp!=null)console.log("New Task Posted!");
                        refreshPage(res,false,"")})
                    .catch(erro=>{
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write('<p>Erro: ' + erro + '</p>')
                        res.write('<p><a href="/">Voltar</a></p>')
                        res.end()
                    })
                    
                } else if(resultado.formType=="editTask"&&resultado.id==undefined&&resultado.mdid==undefined){
                    refreshPage(res,false,ob);
                }
                /*MARK DONE*/ 
                else if(resultado.formType=="editTask"&& resultado.mdid!=undefined){
                    delete resultado.formType;
                    axios.get('http://localhost:3001/tasks/'+resultado.mdid)
                    .then(resp=>{
                        resp.data.done="true";

                        var ob= "?_sort="+resultado.todoOrderBy+'&_order=asc';
                        axios.put('http://localhost:3001/tasks/'+resultado.mdid, resp.data)
                        .then(rps=>{console.log("Task Marked: "+ resultado.mdid)})
                        .catch(errr=>{console.log("Erro no put do markdone")})
                        refreshPage(res,false,ob)
                    })
                    .catch(error=>{console.log("Erro no markDone : "+error)})
                    

                   //EDIT 
                }else if(resultado.formType=="editTask"&& resultado.id!=undefined &&resultado.mdid==undefined){
                    delete resultado.formType;
                    var ob= "?_sort="+resultado.todoOrderBy+'&_order=asc';
                    axios.get('http://localhost:3001/tasks/'+resultado.id, resultado)
                    .then(resp=>{refreshPage(res,resp.data,ob)})
                    .catch(erro=>{console.log("Erro no get do edit")})
                }else if(/doEdit/.test(resultado.formType)){

                    var ob= "?_sort="+resultado.todoOrderBy+'&_order=asc';
                    console.log("FORM DO DOEDIT" +JSON.stringify(resultado));
                    delete resultado.formType;
                    axios.put('http://localhost:3001/tasks/'+resultado.id, resultado)
                    .then(resp=>{refreshPage(res,false,ob)})
                    .catch(erro=>{console.log("Erro no put do doEdit")})

                }else if(resultado.formType=="deleteButton"){   
                    delete resultado.formType;
                    var allIndexes;
                    axios.get('http://localhost:3001/tasks?done=true', resultado)
                    .then(resp=>{
                        resp.data.forEach(e=>{
                            axios.delete('http://localhost:3001/tasks/'+e.id)
                        .then(a=>{
                            
                            console.log("DELETED!"+e.id);})
                        .catch(erro=>{
                                console.log("Error deleting task "+e.id)
                            });
                        })
                        refreshPage(res,false,ob);
                    })
                    .catch(console.log("Erro no DELETE ALL"));
                    
                }
                

                    
            })
        }else{refreshPage(res,false,"")}
                    }
                    else{
        res.writeHead(404, {'Content-Type': 'text/html;charset=utf-8'})
        res.write("<html><head></head><body> THIS IS A 404</body></html>")
        res.end()
    }
            
}}).listen(7777);
console.log("Server up at port 7777");

function refreshPage(res,vals,ob){
    axios.get("http://localhost:3001/tasks"+ob)
    .then(response => {
        const data =response.data;
        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8',
       'Location':'/'})
        res.write(genBaseHtml(data,vals))
        res.end()
    })
    .catch(erro => {
        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
        res.write('<p>Erro: ' + erro + '</p>');
        res.write('<p><a href="/">Voltar</a></p>');
        res.end();
    })
}

function  genBaseHtml(tasks, vals){
    var done =[];
    var todo =[];
    tasks.forEach(e=>{
        
        if(e.done=="true") done.push(e);
        else todo.push(e);

    })
    
    var ret=    `
    <html>
    <head>
    <link rel="stylesheet" href="w3.css" />
    <link rel="stylesheet" href="myCss.css" />
    <link rel="icon" href="favicon.png"/>
    <title>Task Manager</title>
    </head>
    <body>
    
    
    <div class="w3-row-padding">
    <h2  >Task Manager</h2>
    <div  class="w3-col s4 " > ${genForm(vals)}</div>
    

    
    <div class="w3-col s8" >
    
    <form class = "w3-container" action="/" method="POST">
    <input class="w3-input w3-button w3-light-blue" type="submit" value="Editar">
    <h3>Tasks TO-DO</h3>
    <div class="w3-responsive">
    <table class="w3-table w3-striped">
    </div>
    <label class="w3-text-teal">Order results by:</label>
    <label class="w3-text-teal"><input class="w3-input w3-button w3-light-blue" type="radio" name="orderHow" value="asc" ><b>Asc</b></label>
    <label class="w3-text-teal">
    <input class="w3-input w3-button w3-light-blue" type="radio" name="orderHow" value="desc" ><b>Desc</b></label>
    <tr>
    <th>Mark Done</th>
    <th>Edit</th>

    
    <th>Type  <input class="w3-input w3-button w3-light-blue" type="radio" name="todoOrderBy" value="type" ></th>
    <th>Date Created <input class="w3-input w3-button w3-light-blue" type="radio" name="todoOrderBy" value="dateCreated" ></th>
    <th>Date Due <input class="w3-input w3-button w3-light-blue" type="radio" name="todoOrderBy" value="dateDue" ></th>
    <th>Who<input class="w3-input w3-button w3-light-blue" type="radio" name="todoOrderBy" value="who" ></th>
    <th>What <input class="w3-input w3-button w3-light-blue" type="radio" name="todoOrderBy" value="what" ></th>
    </tr>
    
     <input type="hidden" name="formType" value="editTask" ></input>
     ${printTable(todo,true)}
        
    </tr>
    </table>
    </form>
    </div>
    
    </div>
    <div class="w3-row-padding ">
        <h3>DONE</h3>
    <div class="w3-col s12" >
    <form class = "w3-container" action="/" method="POST">
    <input class="w3-input w3-border w3-light-grey" type="submit" value="Delete All Done" >
    <input class="w3-input w3-border w3-light-grey" type="hidden" name="formType" value="deleteButton">
    </form>
    <form class = "w3-container" action="/" method="POST">
    <input class="w3-input w3-button w3-light-blue" type="submit" value="Editar">
    <input type="hidden" name="formType" value="editTask" >
    
    <table class="w3-table w3-striped">
    <tr>
    <th>Edit</th>
    <th>Type</th>
    <th>Date Created</th>
    <th>Date Due</th>
    <th>Who</th>
    <th>What</th>
    </tr>
    
    ${printTable(done,false)}
    </tr>
    </table>
    </form>
    </div>
    </div>
    </body>
    </html>`
    return ret;
}
function genForm(vals){
    if (vals==false) return `        
    <form class = "w3-container" action="/" method="POST">
    <input class="w3-input w3-border w3-light-grey" type="hidden" name="dateCreated" value="ReplaceThis">
    <label class="w3-text-teal"><b>Date Due</b></label>
    <input class="w3-input w3-border w3-light-grey" type="text" name="dateDue" >
    <label class="w3-text-teal"><b>Who</b></label>
    <input class="w3-input w3-border w3-light-grey" type="text" name="who" >
    <label class="w3-text-teal"><b>What</b></label>
    <input class="w3-input w3-border w3-light-grey" type="text" name="what" >
    <label class="w3-text-teal"><b>Type</b></label>
    <input class="w3-input w3-border w3-light-grey" type="text" name="type" >
    <input class="w3-input w3-border w3-light-grey" type="hidden" name="done" >
    <input class="w3-input w3-border w3-light-grey" type="hidden" name="formType" value="newTask">
    <input class="w3-input w3-button w3-light-blue" type="submit"  value="SUBMIT">
</form>`
    else{
    return `        
    <form class = "w3-container" action="/" method="POST">
    <input class="w3-input w3-border w3-light-grey" type="hidden" name="dateCreated" value=${vals.dateCreated} >
    <label class="w3-text-teal"><b>Date Due</b></label>
    <input class="w3-input w3-border w3-light-grey" type="text" name="dateDue" value=${vals.dateDue}>
    <label class="w3-text-teal"><b>Who</b></label>
    <input class="w3-input w3-border w3-light-grey" type="text" name="who" value=${vals.who}>
    <label class="w3-text-teal"><b>What</b></label>
    <input class="w3-input w3-border w3-light-grey" type="text" name="what" value=${vals.what}>
    <label class="w3-text-teal"><b>Type</b></label>
    <input class="w3-input w3-border w3-light-grey" type="text" name="type" value=${vals.type}>
    <input class="w3-input w3-border w3-light-grey" type="hidden" name="done" value=${vals.done}>

    <input class="w3-input w3-border w3-light-grey" type="hidden" name="id" value=${vals.id}>
    <input class="w3-input w3-border w3-light-grey" type="hidden" name="formType" value="doEdit">
    <input class="w3-input w3-button w3-light-blue" type="submit"  value="SUBMIT">
</form>`;
}
}
function printTable(tasks, md){
    var ret = "";
    
    tasks.forEach(e =>{
        ret+= `<tr>`
        if (md) ret+= `<td><input type="radio" value="${e.id}" name="mdid"></td>`
        ret += 
        `
        <td><input type="radio" value="${e.id}" name="id"></td>
        <td>${e.type}</td>
        <td>${e.dateCreated}</td>
        <td>${e.dateDue}</td>
        <td>${e.who}</td>
        <td>${e.what}</td>
        </tr> `
    });
    return(ret);
}

function recuperaInfo(request, callback){
    if(request.headers['content-type'] == 'application/x-www-form-urlencoded'){
        let body = ''
        request.on('data', bloco => {
            body += bloco.toString()
        })
        request.on('end', ()=>{
            callback(parse(body))
        })
    }
}