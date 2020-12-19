const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const toJson = require('@meanie/mongoose-to-json');

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
    },
});

kelasSchema.plugin(toJson);
const kelas = mongoose.model("kelas", kelasSchema);

module.exports = { kelas }