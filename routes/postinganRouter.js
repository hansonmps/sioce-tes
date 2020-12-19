const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const {postingan} = require('../models/postingan');
const {kelas} = require('../models/kelas');

const postinganRouter = express.Router();

postinganRouter.use(bodyParser.json());

postinganRouter.route('/')
    .get((req, res, next) => {
        postingan.find({}).then((dataPostingan) => {
            res.status = 200;
            res.setHeader('Content-type','application/json');
            res.json(dataPostingan);
        }, (err) => {
            res.status(404).send(err);
        })
    })
    .post((req, res, next)=>{
        postingan.create(req.body).then((dataPostingan) => {
            console.log('insert data berhasil');
            res.status = 200;
            res.setHeader('Content-type','application/json');
            res.json(dataPostingan);
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
        // contoh
        postingan.remove({}).then((resp)=>{
            res.status = 200;
            res.setHeader('Content-type','application/json');
            res.json(resp);
        },(err)=>{
            res.status(404).send(err);
        });
    });

postinganRouter.route('/:postId')
    .get((req, res, next) => {
        postingan.findById(req.params.postId).then((dataPostingan) => {
            res.status = 200;
            res.setHeader('Content-type','application/json');
            res.json(dataPostingan);
        },(err)=>{
            res.status(404).send(err);
        });
    })
    .put((req, res, next)=>{
        postingan.findByIdAndUpdate(req.params.postId,{
            $set: req.body
        }, {new: true})
        .then((dataPostingan) => {
            res.status = 200;
            res.setHeader('Content-type','application/json');
            res.json(dataPostingan);
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
        postingan.findByIdAndRemove(req.params.postId)
        .then((resp) => {
            res.status = 200;
            res.setHeader('Content-type','application/json');
            res.json(resp);
        },(err)=>{
            res.status(404).send(err);
            res.end('Failed to remove data');
        });
    });

// not fixed
postinganRouter.route('/:classId')
    .get((req, res, next) => {
        postingan.find({class_Id: req.params.classId}).then((dataPostingan) => {
            res.status = 200;
            res.setHeader('Content-type','application/json');
            res.json(dataPostingan);
        },(err)=>{
            res.status(404).send(err);
        });
    })

module.exports = postinganRouter;