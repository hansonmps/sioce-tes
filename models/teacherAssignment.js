const mongoose = require('mongoose');
const Schema = mongoose.Schema;
  
const assignmentSchema = new Schema({
    classId: {
        type: mongoose.Types.ObjectId,
        ref: "kelas",
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    expired: {
        type: Date
    },
    fileAssignments: [String]
}, {
    timestamps: true
});
 
const Assignment = mongoose.model('Assignment', assignmentSchema);
module.exports = Assignment;