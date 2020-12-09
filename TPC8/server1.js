var express = require('express');
var bodyparser = require('body-parser')

var app = express();
///for url encoded
app.use(bodyparser.urlencoded({extended : false}));
//for json
app.use(bodyparser.json())
//for jokes lol
app.use((req,res,next) =>{
    console.log(JSON.stringify(req.body))
    next();
})

app.get('*', (req,res)=>{
    res.send("Hello World GET");

})
app.post('*', (req,res)=>{
    res.send("Hello World POST");
    
})
app.listen(7700,()=>console.log('Server listening at 7700'))