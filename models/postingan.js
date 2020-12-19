const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const toJson = require('@meanie/mongoose-to-json');

const postinganSchema = new Schema({
    class_Id: {
        type: mongoose.Types.ObjectId,
        ref:"kelas",
        required: true,
        // unique: true
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

postinganSchema.plugin(toJson);
const postingan = mongoose.model("postingan", postinganSchema);
module.exports = { postingan }