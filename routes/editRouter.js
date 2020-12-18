const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const User = require("../models/User");

const editRouter = express.Router();

editRouter.use(bodyParser.json());

editRouter.route('/:userId')
    .get((req, res, next) => {
        User.findById(req.params.userId).then((dataUser) => {
            res.status = 200;
            res.setHeader('Content-type','application/json');
            res.json(dataUser);
        },(err)=>{
            res.status(404).send(err);
        });
    })
    .put((req, res, next) => {
        User.findByIdAndUpdate(req.params.userId,{
            $set: req.body
        }, {new: true})
        .then((dataUser) => {
            res.status = 200;
            res.setHeader('Content-type','application/json');
            res.json(dataUser);
        },(err)=>{
            if (err.name == "MongoError" && err.code == 11000){
                res.status(422).send({ success: false, error:"Data sama!", value: err.keyValue});
            }
            else{
                res.status(404).send(err)
            };
        });
    }); 

module.exports = editRouter;