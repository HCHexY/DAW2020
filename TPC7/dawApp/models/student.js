var mongoose = require('mongoose')

var studentSchema = new mongoose.Schema({
    numero: String,
    nome: String,
    git: String,
    tpc: [Number]
});

module.exports = mongoose.model('student', studentSchema)