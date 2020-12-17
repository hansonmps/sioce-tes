const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const {postingan, komentar} = require('../models/komentar');

const komentarRouter = express.Router();

komentarRouter.use(bodyParser.json());

komentarRouter.route('/')
    .get((req, res, next) => {
        komentar.find({}).then((dataKomentar) => {
            res.status = 200;
            res.setHeader('Content-type','application/json');
            res.json(dataKomentar);
        }, (err) => {
            res.status(404).send(err);
        })
    })
    .post((req, res, next)=>{
        komentar.create(req.body).then((dataKomentar) => {
            console.log('insert data berhasil');
            res.status = 200;
            res.setHeader('Content-type','application/json');
            res.json(dataKomentar);
        },(err)=>{
            if (err.name == "MongoError" && err.code == 11000){
                res.status(422).send({ success: false, error:"Data yang sama di temukan", value: err.keyValue});S
            }
            else{
                res.status(404).send(err)
            };
        });
    })
    .delete((req, res, next)=>{
        komentar.remove({}).then((resp)=>{
            res.status = 200;
            res.setHeader('Content-type','application/json');
            res.json(resp);
        },(err)=>{
            res.status(404).send(err);
        });
    });
    
komentarRouter.route('/:postId')
    .get((req, res, next) => {
        // console.log(req.params.dishId);
        komentar.findById(req.params.commentsId).then((dataKomentar) => {
            res.status = 200;
            res.setHeader('Content-type','application/json');
            res.json(dataKomentar);
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

module.exports = postinganRouter;