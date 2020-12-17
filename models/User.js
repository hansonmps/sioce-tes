const mongoose = require('mongoose');

const model_name = 'users';

const schmea = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        index: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    birthdate: {
        type: String,
    },
    sex: {
      type: String,
      required: true,
      min: 9,
      max: 12,
    },
    phone: {
      type: String,
      required: true,
      min: 10,
      max: 12,
    },
    password: {
        type: String,
        required: true,
    },
    status: {
      type: String,
      required: true,
    }
  },{
    timestamps: true
  });

module.exports = mongoose.model(model_name, schmea, model_name);