const express = require("express");

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const StudentLogin = require("../models/studentLogin");

const { loginUser, seeUser, seeUserById } = require("../controllers/Login");
const { createOutpass } = require("../controllers/student");
const {
  seeAppliedLeaves,
  seePastLeaves,
  updateLeave,
  vaccinationStatus,
  statusMail,
} = require("../controllers/warden");
const {
  seeApprovedLeaves,
  updateApprovedLeave,
} = require("../controllers/security");
const { adminloginUser } = require("../controllers/adminLogin");
const verifyToken = require("../middlewares/verifyToken");
const { postVisitors } = require("../controllers/Visitors");

const router = express.Router();

// Student
router.post("/login", loginUser);
router.post("/createpass", createOutpass);
router.get("/profile", verifyToken, seeUser);
router.get("/profile/:id", seeUserById);

// Warden
router.post("/admin-login", adminloginUser);
router.get("/appliedleaves", seeAppliedLeaves);
router.get("/pastleaves", seePastLeaves);
router.put("/updateleave", updateLeave);
router.get("/vaccination/:id", vaccinationStatus);
router.post("/mail", statusMail);

// Visitors
router.post("/visitor", postVisitors);
 
// Security
router.get("/approvedleaves", seeApprovedLeaves);
router.put("/updateapprovedleave", updateApprovedLeave);

module.exports = router;
