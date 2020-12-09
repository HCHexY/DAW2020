var express = require('express');
var bodyparser = require('body-parser')
var templates = require('./html-templates')
var jsonfile = require('jsonfile')
var logger = require('morgan')


var multer = require('multer');
const { json } = require('body-parser');
const { publicDecrypt } = require('crypto');
const { fstat } = require('fs');
var fs = require('fs');

var upload = multer({dest : 'uploads/'})


var app = express();

app.use(logger('dev'))
///for url encoded
app.use(bodyparser.urlencoded({extended : false}));
//for json
app.use(bodyparser.json())
//for jokes lol
app.use(express.static('public'))


app.get('/', (req,res)=>{
    var d = new Date().toISOString().substr(0,16);
    var files = jsonfile.readFileSync('./dbFiles.json')
    res.writeHead(200,{'Content-Type' : 'text/html;charset=utf-8'})
    res.write(templates.fileForm(d))
    res.end();

})
app.get('/files', (req,res)=>{
    var d = new Date().toISOString().substr(0,16);
    var files = jsonfile.readFileSync('./dbFiles.json')
    res.writeHead(200,{'Content-Type' : 'text/html;charset=utf-8'})
    res.write(templates.fileList(files,d))
    res.end();

})
app.get('/files/upload', (req,res)=>{
    var d = new Date().toISOString().substr(0,16);
    var files = jsonfile.readFileSync('./dbFiles.json')
    res.writeHead(200,{'Content-Type' : 'text/html;charset=utf-8'})
    res.write(templates.fileForm(d))
    res.end();

})
app.get('/files/download/:fname', (req,res)=>{
    res.download(__dirname + '/public/fileStore/'+req.params.fname)
})

app.get('/fileStore/:id', (req,res)=>{
   var newPath = __dirname+'/public/fileStore/'+req.params.id;

})
/*
app.post('/files',upload.array('myFile'), (req,res)=>{
    console.log("serverPost /filessingle:" + JSON.stringify(req.file))
    var d = new Date().toISOString().substr(0,16);
    //req.file é o ficheiro do myFile com os metadados 
    //req.body tem os outros valores do formulário (desc)
    //multiple files : upload.array(...)=> req.files é um array de file
    let oldPath = __dirname+'/'+req.file.path
    let newPath = __dirname+'/public/fileStore/'+req.file.originalname
    fs.rename(oldPath,newPath,(err)=>{
        if(err) throw err
    });
    var files = jsonfile.readFileSync('./dbFiles.json')
    files.push(
        {
            date :d,
            name : req.file.originalname,
            size:   req.file.size,
            mimetype: req.file.mimetype,
            desc: req.body.desc
        }
    )
    jsonfile.writeFileSync('./dbFiles.json', files)
    res.redirect('/files')
});
*/
app.get('/files/upload', (req,res)=>{
    var d = new Date().toISOString().substr(0,16);
    var files = jsonfile.readFileSync('./dbFiles.json')
    res.writeHead(200,{'Content-Type' : 'text/html;charset=utf-8'})
    res.write(templates.fileForm(d))
    res.end();
})

app.post('/files',upload.array('myFile'), (req,res)=>{
    var d = new Date().toISOString().substr(0,16);

    //req.file é o ficheiro do myFile com os metadados 
    //req.body tem os outros valores do formulário (desc)
    //multiple files : upload.array(...)=> req.files é um array de file
    var files = jsonfile.readFileSync('./dbFiles.json')
    var i;
    for(i=0;i<req.files.length;i++){

        var fl= req.files[i];
        var ds = req.body.desc[i];
        let oldPath = __dirname+'/'+fl.path
    let newPath = __dirname+'/public/fileStore/'+fl.originalname
    fs.rename(oldPath,newPath,(err)=>{
        if(err) throw err
    });
    files.push(
        {
            date :d,
            name : fl.originalname,
            size:   fl.size,
            mimetype: fl.mimetype,
            desc: ds
        }
    )
    }
jsonfile.writeFileSync('./dbFiles.json', files)
    res.redirect('/files')
})

app.post('*', (req,res)=>{
    res.send("Hello World POST");
    
})
app.listen(7700,()=>console.log('Server listening at 7700'))