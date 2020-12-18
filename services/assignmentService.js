const Assignments = require("../models/teacherAssignment");
const fileUtils = require("../util/fileUtils");


const getAll = async () => {
  const assignments = await Assignments.find();
  for (const assignment of assignments) {
    assignment.fileAssignments = assignment.fileAssignments.map((fileAssignment) =>
      fileUtils.buildFileAddress(fileAssignment)
    );
  }
  return assignments;
};

const add = async (assignment) => {
  const newassignment = new Assignments(assignment);
  const result = await newassignment.save();
  result.fileAssignments = result.fileAssignments.map((fileAssignment) =>
    fileUtils.buildFileAddress(fileAssignment)
  );
  return result;
};

const deleteAll = async () => {
  const assignments = await Assignments.find();
  for (const assignment of assignments) {
    for (const fileAssignment of assignment.fileAssignments) {
      fileUtils.deleteFile(fileAssignment);
    }
  }
  return await assignments.remove();
};

const get = async (id) => {
  const assignment = await Assignments.findById(id);
  assignment.fileAssignments = assignment.fileAssignments.map((fileAssignment) =>
    fileUtils.buildFileAddress(fileAssignment)
  );
  return assignment;
};

const update = async (id, updateassignment) => {
  const assignment = await Assignments.findById(id);
  if (assignment == null) {
    return null;
  }
  if (updateassignment.fileAssignments != null) {
    for (const fileAssignment of assignment.fileAssignments) {
      fileUtils.deleteFile(fileAssignment);
    }
  }
  const result = await Assignments.findByIdAndUpdate(
    id,
    { $set: updateassignment },
    { new: true }
  );
  result.fileAssignments = result.fileAssignments.map((fileAssignment) =>
    fileUtils.buildFileAddress(fileAssignment)
  );
  return result;
};

const deleteById = async (id) => {
  const assignment = await Assignments.findByIdAndDelete(id);
  if (assignment == null) {
    return null;
  }
  for (const fileAssignment of assignment.fileAssignments) {
    fileUtils.deleteFile(fileAssignment);
  }
  return assignment;
};

module.exports = {
  getAll,
  add,
  deleteAll,
  get,
  update,
  deleteById,
};
