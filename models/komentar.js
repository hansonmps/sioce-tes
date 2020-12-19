const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const toJson = require('@meanie/mongoose-to-json');

const komentarSchema = new Schema({
    postingId: {
        type: mongoose.Types.ObjectId,
        ref: "postingan",
        required: true,
        unique: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "user",
        required: true,
        unique: true
    },
    comments: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

komentarSchema.plugin(toJson);
const komentar = mongoose.model("komentar", komentarSchema);
module.exports = { komentar }