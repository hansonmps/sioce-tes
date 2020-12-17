const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var kelasSchema = new Schema({
    classname: {
        type: String,
        // ref:"kelas",
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
    },
    maxstudent: {
        type: Number,
        required: true,
    }
});

var kelas = mongoose.model("kelas", kelasSchema);
module.exports = { kelas }