const Uploads = require("../models/studentAssignment");
const fileUtils = require("../util/fileUtils");


const getAll = async () => {
  const uploads = await Uploads.find();
  for (const upload of uploads) {
    upload.fileuploads = upload.fileuploads.map((fileupload) =>
      fileUtils.buildFileAddress(fileupload)
    );
  }
  return uploads;
};

const add = async (upload) => {
  const newupload = new Uploads(upload);
  const result = await newupload.save();
  result.fileuploads = result.fileuploads.map((fileupload) =>
    fileUtils.buildFileAddress(fileupload)
  );
  return result;
};

const deleteAll = async () => {
  const uploads = await Uploads.find();
  for (const upload of uploads) {
    for (const fileupload of upload.fileuploads) {
      fileUtils.deleteFile(fileupload);
    }
  }
  return await uploads.remove();
};

const get = async (id) => {
  const upload = await Uploads.findById(id);
  upload.fileuploads = upload.fileuploads.map((fileupload) =>
    fileUtils.buildFileAddress(fileupload)
  );
  return upload;
};

const update = async (id, updateupload) => {
  const upload = await Uploads.findById(id);
  if (upload == null) {
    return null;
  }
  if (updateupload.fileuploads != null) {
    for (const fileupload of upload.fileuploads) {
      fileUtils.deleteFile(fileupload);
    }
  }
  const result = await Uploads.findByIdAndUpdate(
    id,
    { $set: updateupload },
    { new: true }
  );
  result.fileuploads = result.fileuploads.map((fileupload) =>
    fileUtils.buildFileAddress(fileupload)
  );
  return result;
};

const deleteById = async (id) => {
  const upload = await Uploads.findByIdAndDelete(id);
  if (upload == null) {
    return null;
  }
  for (const fileupload of upload.fileuploads) {
    fileUtils.deleteFile(fileupload);
  }
  return upload;
};

module.exports = {
  getAll,
  add,
  deleteAll,
  get,
  update,
  deleteById,
};
