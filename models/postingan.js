const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postinganSchema = new Schema({
    classId: {
        type: mongoose.Types.ObjectId,
        ref:"kelas",
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

const postingan = mongoose.model("postingan", postinganSchema);
module.exports = { postingan }