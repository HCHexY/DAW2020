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

router.get('/students/edit/:id', function(req, res) {
  // Data retrieve
  var eId= req.params.id
  console.log(eId)
  Student.lookUp(eId)
    .then(data => res.render('editar', { student: data }))
    .catch(err => res.render('error', {error: err}))
  ;
});

router.post('/students/edit', function(req, res) {
  // Data retrieve
  var tpclist=[];
  req.body.tpc.split(',').forEach(element => {
    if(/(0|1)/.test(element))
    tpclist.push(element);
  });
  var newStudent;
Student.lookUp(req.body.numero)
.then(data=>{
  newStudent =({"numero" : req.body.numero,
                              "nome" : req.body.nome,
                              "git" :req.body.git,
                              "tpc" : tpclist
                              
                            })
  Student.update(data._id,newStudent)
  .then(data=>{console.log("pRINT DATA :"+data); var tpcl=[];
    data.tpc.split(',').forEach(element => {
      if(/(0|1)/.test(element))
      tpcl.push(element);
    });
    data.tpc=tpcl;
     res.render('student',{student:data})})   
  .catch(err => res.render('error', {error: err}))                       
                      
})
.catch(err => res.render('error', {error: err}));



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
