const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

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
        // console.log(req.params.dishId);
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
        dataKelas.findByIdAndRemove(req.params.classId)
        .then((resp) => {
            res.status = 200;
            res.setHeader('Content-type','application/json');
            res.json(resp);
        },(err)=>{
            res.status(404).send(err);
            res.end('Failed to remove data');
        });
    });

module.exports = kelasRouter;