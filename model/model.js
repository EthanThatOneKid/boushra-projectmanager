const mongoose = require('mongoose');

/* This is just for the MongoDB part when I add that part in later. Just ignore this. */
const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
    },
    description: {
      type: String,
      required: true,
    },
    payment: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Project = mongoose.model('Project', schema); //should be a signular of a collection name for Project by defining the name as a sinfgular
module.exports = Project;
