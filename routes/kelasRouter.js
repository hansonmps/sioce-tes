const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Assignments = require("../models/teacherAssignment");
const {kelas} = require('../models/kelas');

const kelasRouter = express.Router();

kelasRouter.use(bodyParser.json());

kelasRouter.route('/')
    .get((req, res, next) => {
        kelas.find({}).then((dataKelas) => {
            res.status = 200;
            res.setHeader('Content-type','application/json');
            res.json(dataKelas);
        }, (err) => {
            res.status(404).send(err);
        })
    })
    .post((req, res, next)=>{
        kelas.create(req.body).then((dataKelas) => {
            console.log('insert data berhasil');
            res.status = 200;
            res.setHeader('Content-type','application/json');
            res.json(dataKelas);
        },(err)=>{
            if (err.name == "MongoError" && err.code == 11000){
                res.status(422).send({ success: false, error:"Data yang sama di temukan", value: err.keyValue});
            }
            else{
                res.status(404).send(err)
            };
        });
    });

kelasRouter.route('/:classId')
    .get((req, res, next) => {
        kelas.findById(req.params.classId).then((dataKelas) => {
            res.status = 200;
            res.setHeader('Content-type','application/json');
            res.json(dataKelas);
        },(err)=>{
            res.status(404).send(err);
        });
    })
    .put((req, res, next)=>{
        kelas.findByIdAndUpdate(req.params.classId,{
            $set: req.body
        }, {new: true})
        .then((dataKelas) => {
            res.status = 200;
            res.setHeader('Content-type','application/json');
            res.json(dataKelas);
        },(err)=>{
            if (err.name == "MongoError" && err.code == 11000){
                res.status(422).send({ success: false, error:"Data yang sama di temukan", value: err.keyValue});
            }
            else{
                res.status(404).send(err)
            };
        });
    })
    .delete((req, res, next)=>{
        kelas.findByIdAndRemove(req.params.classId)
        .then((resp) => {
            res.status = 200;
            res.setHeader('Content-type','application/json');
            res.json(resp);
        },(err)=>{
            res.status(404).send(err);
            res.end('Failed to remove data');
        });
    });

kelasRouter.route('/:classId')
    .get((req, res, next) => {
      Assignments.findById(req.params.classId).then((dataAssignments) => {
            res.status = 200;
            res.setHeader('Content-type','application/json');
            res.json(dataAssignments);
        },(err)=>{
            res.status(404).send(err);
        });
    });
    

module.exports = kelasRouter;