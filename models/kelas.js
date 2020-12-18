const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const kelasSchema = new Schema({
    classname: {
        type: String,
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

const kelas = mongoose.model("kelas", kelasSchema);
module.exports = { kelas }