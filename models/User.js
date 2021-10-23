// import mongoose from "mongoose";
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

// EID, NAME, EMAIL, PASSWORD, TYPE;
const userSchema = new mongoose.Schema({
  EID: {
    type: "String",
    required: true,
  },
  NAME: {
    type: "String",
    required: true,
  },
  EMAIL: {
    type: "String",
  },
  PASSWORD: {
    type: "String",
    required: true,
  },

  TYPE: {
    type: "String",
    required: true,
  },
});

const Users = mongoose.model("Users", userSchema);

module.exports = {
  Users: Users,
};
