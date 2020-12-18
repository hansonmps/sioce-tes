const mongoose = require('mongoose');
const Schema = mongoose.Schema;
  
const uploadSchema = new Schema({
    assignmentId: {
        type: mongoose.Types.ObjectId,
        ref: "assignment",
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "user",
        required: true
    },
    fileuploads: [String]
}, {
    timestamps: true
});
 
const Upload = mongoose.model('Upload', uploadSchema);
 
module.exports = Upload;