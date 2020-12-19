const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const {komentar} = require('../models/komentar');

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
                res.status(422).send({ success: false, error:"Data yang sama di temukan", value: err.keyValue});
            }
            else{
                res.status(404).send(err)
            };
        });
    })
    
komentarRouter.route('/:commentsId')
    .get((req, res, next) => {
        komentar.findById(req.params.commentsId).then((dataKomentar) => {
            res.status = 200;
            res.setHeader('Content-type','application/json');
            res.json(dataKomentar);
        },(err)=>{
            res.status(404).send(err);
        });
    })
    .delete((req, res, next)=>{
        komentar.findByIdAndRemove(req.params.commentsId)
        .then((resp) => {
            res.status = 200;
            res.setHeader('Content-type','application/json');
            res.json(resp);
        },(err)=>{
            res.status(404).send(err);
            res.end('Failed to remove data');
        });
    });

module.exports = komentarRouter;