const Assignments = require("../models/teacherAssignment");
const fileUtils = require("../util/fileUtils");


const getAll = async () => {
  const assignments = await Assignments.find();
  for (const assignment of assignments) {
    assignment.photos = assignment.photos.map((photo) =>
      fileUtils.buildFileAddress(photo)
    );
  }
  return assignments;
};

const add = async (assignment) => {
  const newassignment = new Assignments(assignment);
  const result = await newassignment.save();
  result.photos = result.photos.map((photo) =>
    fileUtils.buildFileAddress(photo)
  );
  return result;
};

const deleteAll = async () => {
  const assignments = await Assignments.find();
  for (const assignment of assignments) {
    for (const photo of assignment.photos) {
      fileUtils.deleteFile(photo);
    }
  }
  return await assignments.remove();
};

const get = async (id) => {
  const assignment = await Assignments.findById(id);
  assignment.photos = assignment.photos.map((photo) =>
    fileUtils.buildFileAddress(photo)
  );
  return assignment;
};

const update = async (id, updateassignment) => {
  const assignment = await Assignments.findById(id);
  if (assignment == null) {
    return null;
  }
  if (updateassignment.photos != null) {
    for (const photo of assignment.photos) {
      fileUtils.deleteFile(photo);
    }
  }
  const result = await Assignments.findByIdAndUpdate(
    id,
    { $set: updateassignment },
    { new: true }
  );
  result.photos = result.photos.map((photo) =>
    fileUtils.buildFileAddress(photo)
  );
  return result;
};

const deleteById = async (id) => {
  const assignment = await Assignments.findByIdAndDelete(id);
  if (assignment == null) {
    return null;
  }
  for (const photo of assignment.photos) {
    fileUtils.deleteFile(photo);
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
