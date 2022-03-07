const momgoose = require('mongoose');

const { Schema, model } = momgoose;

const userSchema = new Schema({
  __v: {
    type: Number,
    select: false
  },
  user: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  telePhone: {
    type: String,
    required: false
  },
  avatar: {
    type: String,
    required: false
  }
});

module.exports = model('user', userSchema);
