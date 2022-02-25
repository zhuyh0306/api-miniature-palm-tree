const momgoose = require('mongoose');

const { Schema, model } = momgoose;

const userSchema = new Schema({
  userName: {
    type: String, required: true,
  },
  telePhone: {
    type: String, required: true,
  },
});
