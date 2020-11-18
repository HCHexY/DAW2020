var http= require('http'); //Carregar modulo http
var axios = require('axios');


http.createServer(function (req,res){
    console.log(req.method + ' '+ req.url);
    if(req.method=="GET"){
    if(req.url == '/'){
        res.writeHead(200,{'Content-Type':'text/html; charset = utf-8'})
   
        res.write('<h2>Escola de Musica</h2>');
        res.write('<ul>')
        res.write('<li> <a href="/alunos">Lista de Alunos</a> </li>')

        res.write('<li> <a href="/cursos">Lista de Cursos</a> </li>')
        res.write('<li> <a href="/instrumentos">Lista de Instrumentos</a> </li>')

        res.write('</ul>')
        res.end()
    }
    else if(req.url=='/alunos'){
        axios.get('http://localhost:3001/alunos')
            .then(resp => {
            alunos = resp.data;
            res.writeHead(200,{'Content-Type':'text/html; charset = utf-8'})
            res.write('<h2>Escola de musica : Lista de Alunos</h2>')
            res.write('<ul>')
            alunos.forEach(a => {
                res.write('<li> <a href="/alunos/'+a.id+'">'+ a.id +'-' + a.nome+'</a></li>')
            });
            res.write('</ul>');
            res.write('<address>[<a href="/"> Voltar</a>]</address>')
            res.end();
            })
            .catch(error => {
        console.log("Erro na obtenção da lista de alunos: "+error);
            });
    }
    else if(req.url =='/cursos'){
        axios.get('http://localhost:3001/cursos')
            .then(resp => {
            alunos = resp.data;
            res.writeHead(200,{'Content-Type':'text/html; charset = utf-8'})
            res.write('<h2>Escola de musica : Lista de Cursos</h2>')
            res.write('<ul>')
            alunos.forEach(a => {
                res.write(`<li><a href="/cursos/${a.id}" >`+a.id+'-' + a.designacao+'</a></li>')
            });
            res.write('</ul>');
            res.write('<address>[<a href="/"> Voltar</a>]</address>')
            res.end();
            })
            .catch(error => {
        console.log("Erro na obtenção da lista de cursos: "+error);
            });

    }
    else if(req.url =='/instrumentos'){
        axios.get('http://localhost:3001/instrumentos')
            .then(resp => {
            alunos = resp.data;
            res.writeHead(200,{'Content-Type':'text/html; charset =utf-8'})
            res.write('<h2>Escola de musica : Lista de Instrumentos</h2>')
            res.write('<ul>')
            alunos.forEach(a => {
                res.write(`<li><a href="/instrumentos/${a.id}" >`+a.id+'-' + a['#text']+'</a></li>')
            });
            res.write('</ul>');
            res.write('<address>[<a href="/"> Voltar</a>]</address>')
            res.end();
            })
            .catch(error => {
        console.log("Erro na obtenção da lista de instrumentos: "+error);
            });

    }
    else if(req.url.match('/alunos/[a-zA-Z0-9]+$')){
        const cp = req.url.split('/');
        axios.get('http://localhost:3001/alunos/'+cp[cp.length-1])
            .then(resp => {
               
            alunos = resp.data;
            keys = Object.keys(alunos);
            res.writeHead(200,{'Content-Type':'text/html; charset = utf-8'})
            res.write('<h2>Escola de musica :Aluno</h2>')
            res.write('<ul>')
            keys.forEach(k => {
                if(k=='curso') res.write(`<li> ${k} : <a href="/cursos/${alunos[k]}"> ${alunos[k]} </a></li>`)
                else
                res.write('<li> '+ k + ' : ' + alunos[k]  +'</li>')
            });
            res.write('</ul>');
            res.write('<address>[<a href="/alunos"> Voltar</a>]</address>')
            res.end();
            })
            .catch(error => {
        console.log("Erro na obtenção do aluno: "+error);
            });
    }
    else if(req.url.match('/cursos/[a-zA-Z0-9]+$')){
        const cp = req.url.split('/');
        axios.get('http://localhost:3001/cursos/'+cp[cp.length-1])
            .then(resp => {
               
            alunos = resp.data;
            keys = Object.keys(alunos);
            res.writeHead(200,{'Content-Type':'text/html; charset = utf-8'})
            res.write('<h2>Escola de musica :Curso</h2>')
            res.write('<ul>')
            keys.forEach(k => {
                if(k!=='instrumento')
                res.write('<li> '+ k + ' : ' + alunos[k]  +'</li>')
                else {
                const ins = alunos[k];
                res.write(`<li><a href="/instrumentos/${ins.id}"> ${ins['#text']} </a></li>`)
            }
            });
            res.write('</ul>');
            res.write('<address>[<a href="/cursos"> Voltar</a>]</address>')
            res.end();
            })
            .catch(error => {
        console.log("Erro na obtenção do curso: "+error);
            });
    }
    else if(req.url.match('/instrumentos/[a-zA-Z0-9]+$')){
        const cp = req.url.split('/');
        axios.get('http://localhost:3001/instrumentos/'+cp[cp.length-1])
            .then(resp => {
               
            alunos = resp.data;
            keys = Object.keys(alunos);
            
            res.writeHead(200,{'Content-Type':'text/html; charset = utf-8'})
            res.write('<h2>Escola de musica :Instrumento</h2>')
            res.write('<ul>')
            keys.forEach(k => {
                res.write('<li> '+ k + ' : ' + alunos[k]  +'</li>')
            
            });
            res.write('</ul>');
            res.write('<address>[<a href="/instrumentos"> Voltar</a>]</address>')
            res.end();
            })
            .catch(error => {
        console.log("Erro na obtenção do curso: "+error);
            });
    }

    else{
        res.writeHead(200,{'Content-Type':'text/html'})
        res.write(`<p>Pedido não suportado ${req.method} <br/> URL: ${req.url}</p>`);
        res.end();

    }

}
else{
    res.writeHead(200,{'Content-Type':'text/html'})
    res.write(`<p>Pedido não suportado ${req.method} <br/> URL: ${req.url}</p>`);
    res.end();
}
}).listen(4000);                      //Porta do servidor
console.log("Server running on port 4000");