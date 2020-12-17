const mongoose = require('mongoose');
const Schema = mongoose.Schema;
  
var uploadSchema = new Schema({
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
 
var Upload = mongoose.model('Upload', uploadSchema);
 
module.exports = Upload;