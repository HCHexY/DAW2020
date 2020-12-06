var express = require('express');
var router = express.Router();

var Student = require('../controllers/student')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/students', function(req, res) {
  // Data retrieve
  Student.list()
    .then(data => res.render('students', { list: data }))
    .catch(err => res.render('error', {error: err}))
  ;
});
//GET EDIT
router.get('/students/edit/:id', function(req, res) {
  // Data retrieve
  var eId= req.params.id
  console.log(eId)
  Student.lookUp(eId)
    .then(data => res.render('editar', { student: data }))
    .catch(err => res.render('error', {error: err}))
  ;
});

//EDIT 
router.post('/students/edit', function(req, res) {
  // Data retrieve
  console.log("'EditPOST' req.body.tpc="+req.body.tpc);
  var badParse =JSON.parse(req.body.tpc);
  var newStudent = req.body;
  newStudent.tpc = badParse;
  
  Student.update({"numero":newStudent.numero},newStudent)
  .then(data =>{
    console.log("pRINT DATA :"+data); 
    res.render('student',{student:newStudent})})   
  .catch(err => res.render('error', {error: err}))                       

});
//GET DELETE
router.get('/students/delete', function(req, res) {
  res.render('eliminar');
});
//DELETE
router.post('/students/delete', (req,res)=>{
x=req.body.numero;
if(x==undefined){res.render('error'),{error : {stack: "Numero de Aluno Invalido" }}}
else
Student.delete(x)
.then(data=>{ res.redirect("/")})
.catch(err => res.render('error', {error: err}))
});

router.post('/students', function(req, res) {
  // Data retrieve
  console.log("Working")
  var tpclist=[];
  var x="x"
  x= req.body.tpc
  x.replace(/^[01]/,"")
  req.body.tpc.split(',').forEach(element => {
    if(/(0|1)/.test(element))
    tpclist.push(element);
  });
  req.body.tpc=tpclist;
  Student.insert(req.body)
  .then(data=>{res.render('student',{student:data})})
  .catch(err => res.render('error', {error: err}))

  
})


router.get('/students/registar', function(req, res) {
  // Data retrieve
  res.render('registar',{});
});


router.get('/students/:id', function(req, res) {
  // Data retrieve
  var eId= req.url.split('/')[2]
  Student.lookUp(eId)
    .then(data => res.render('student', { student: data }))
    .catch(err => res.render('error', {error: err}))
  ;
});
//


module.exports = router;
