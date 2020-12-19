const express = require("express");
const studentUtils = require("../util/studentUtils");
const studentService = require("../services/studentService");
const response = require("../util/response");
const Uploads = require("../models/studentAssignment");

const studentRouter = express.Router();

studentRouter
  .route("/:id")
  .get(async (req, res, next) => {
    try {
      const result = await studentService.get(req.params.id);
      if (result == null) {
        response.responseFailed(res, 404, "assignment not found");
        return;
      }
      response.responseSuccess(res, result);
    } catch (err) {
      response.responseFailed(res, 500, err.message);
    }
  })
  .post(async (req, res, next) => {
    response.responseFailed(res, 404, "Not Found");
  })
  .put(studentUtils.multer.array("fileuploads"), async (req, res, next) => {
    try {
      console.log(`Update assignment : ${JSON.stringify(req.body)}`);
      body = req.body;
      const student = {
        fileuploads: req.files.map((file) => file.filename)
      };
      const result = await studentService.update(req.params.id, student);
      if (result == null) {
        response.responseFailed(res, 404, "assignment not found");
        return;
      }
      response.responseSuccess(res, result);
    } catch (err) {
      response.responseFailed(res, 500, err.message);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const result = await studentService.deleteById(req.params.id);
      if (result == null) {
        response.responseFailed(res, 404, "assignment not found");
        return;
      }
      response.responseSuccess(res, result);
    } catch (err) {
      response.responseFailed(res, 500, err.message);
    }
  });

studentRouter
  .route("/")
  .get(async (req, res, next) => {
    try {
      const students = await studentService.getAll();
      response.responseSuccess(res, students);
    } catch (err) {
      response.responseFailed(res, 500, err.message);
    }
  })
  .post(studentUtils.multer.array("fileuploads"), async (req, res, next) => {
    try {
      const body = req.body;
      const student = {
        assignmentId: body.assignmentId,
        userId: body.userId,
        fileuploads: req.files.map((file) => file.filename)
      };
      const students = await studentService.add(student);
      response.responseSuccess(res, students);
    } catch (err) {
      response.responseFailed(res, 500, err.message);
    }
  })
  .put(async (req, res, next) => {
    response.responseFailed(res, 404, "Not Found");
  })
  .delete(async (req, res, next) => {
    try {
      const result = await studentService.deleteAll();
      response.responseSuccess(res, result);
    } catch (err) {
      response.responseFailed(res, 500, err.message);
    }
  });

module.exports = studentRouter;
