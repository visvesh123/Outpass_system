// import mongoose from "mongoose";
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
// HTNO, STUDENT_NAME, BRANCH, MOVING, REMARKS, DATE, BATCH;
const securitySchema = new mongoose.Schema({
  HTNO: {
    type: "String",
    required: true,
  },

  STUDENT_NAME: {
    type: "String",
    required: true,
  },
  BRANCH: {
    type: "String",
    required: true,
  },
  MOVING: {
    type: "String",
    required: true,
  },
  REMARKS: {
    type: "String",
    required: true,
  },
  DATE: {
    type: "Date",
    required: true,
  },
  BATCH: {
    type: "String",
  },
});

const security = mongoose.model("security", securitySchema);

//hello
module.exports = security;
