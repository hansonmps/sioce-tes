const mongoose = require('mongoose');
const Schema = mongoose.Schema;
  
var uploadSchema = new Schema({
    assignmentId: {
        type: mongoose.Types.ObjectId
    },
    userId: {
        type: mongoose.Types.ObjectId
    },
    fileuploads: [String]
}, {
    timestamps: true
});
 
var Upload = mongoose.model('Upload', uploadSchema);
 
module.exports = Upload;