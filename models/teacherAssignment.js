const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const toJson = require('@meanie/mongoose-to-json');
  
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
 
assignmentSchema.plugin(toJson);
const Assignment = mongoose.model('Assignment', assignmentSchema);
module.exports = Assignment;