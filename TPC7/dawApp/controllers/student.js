// Student controller

var Student = require('../models/student')

// Returns student list
module.exports.list = () => {
    return Student
        .find()
        .sort({nome:1})
        .exec()
}
// Returns student by id
module.exports.lookUp = id => {
    var stdn =Student
    .findOne({numero: id})
    .exec()
    return stdn
    
}
// Inserts Student
module.exports.insert = student => {
    var newStudent = new Student(student)
    return newStudent.save()
}

// Updates Student
module.exports.update = (id,student) => {
    console.log(id);
    nid = ""+id;
    return Student.findByIdAndUpdate(nid,student);
     
}