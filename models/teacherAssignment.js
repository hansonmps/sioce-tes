const mongoose = require('mongoose');
const Schema = mongoose.Schema;
  
var assignmentSchema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId
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
        type: Date,
        required: true
    },
    image: [String]
}, {
    timestamps: true
});
 
var Assignment = mongoose.model('Assignment', assignmentSchema);
 
module.exports = Assignment;