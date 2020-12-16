const express = require("express");
const fileUtils = require("../util/fileUtils");
const assignmentService = require("../services/assignmentService");
const response = require("../util/response");
const Assignments = require("../models/teacherAssignment");

const assignmentRouter = express.Router();

assignmentRouter
  .route("/:id")
  .get(async (req, res, next) => {
    try {
      const result = await assignmentService.get(req.params.id);
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
  .put(fileUtils.multer.array("photos"), async (req, res, next) => {
    try {
      console.log(`Update assignment : ${JSON.stringify(req.body)}`);
      body = req.body;
      console.log(body.room);
      const assignment = {
        name: body.name,
        description: body.description,
        expired: body.expired,
        photos: req.files.map((file) => file.filename),
      };
      const result = await assignmentService.update(req.params.id, assignment);
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
      const result = await assignmentService.deleteById(req.params.id);
      if (result == null) {
        response.responseFailed(res, 404, "assignment not found");
        return;
      }
      response.responseSuccess(res, result);
    } catch (err) {
      response.responseFailed(res, 500, err.message);
    }
  });

assignmentRouter
  .route("/")
  .get(async (req, res, next) => {
    try {
      const assignments = await assignmentService.getAll();
      response.responseSuccess(res, assignments);
    } catch (err) {
      response.responseFailed(res, 500, err.message);
    }
  })
  .post(fileUtils.multer.array("photos"), async (req, res, next) => {
    try {
      const body = req.body;
      const assignment = {
        name: body.name,
        description: body.description,
        expired: body.expired,
        photos: req.files.map((file) => file.filename),
      };
      const assignments = await assignmentService.add(assignment);
      response.responseSuccess(res, assignments);
    } catch (err) {
      response.responseFailed(res, 500, err.message);
    }
  })
  .put(async (req, res, next) => {
    response.responseFailed(res, 404, "Not Found");
  })
  .delete(async (req, res, next) => {
    try {
      const result = await assignmentService.deleteAll();
      response.responseSuccess(res, result);
    } catch (err) {
      response.responseFailed(res, 500, err.message);
    }
  });

module.exports = assignmentRouter;
