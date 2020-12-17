const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var postinganSchema = new Schema({
    classId: {
        type: String,
        // ref:"kelas",
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

var postingan = mongoose.model("postingan", postinganSchema);
module.exports = { postingan }