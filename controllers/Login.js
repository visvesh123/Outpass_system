const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const StudentLogin = require("../models/studentLogin");
const Login = require('../models/login')
const Token = require('../middlewares/token')


function loginUser(req, res) {
    const { username, password } = req.body;
    StudentLogin.findOne({ HTNO: username })
      .then((existingUser) => {
        //  console.log(existingUser);
        bcrypt.compare(password, existingUser.PASSWORD, (err, result) => {
          if (err) {
            return res.status(402).json({
              message: "Not authorized",
            });
          }
          if (result) {
            const token = Token(existingUser.id, existingUser.HTNO);
            return res.status(200).json({
              message: "User authorization successful",
              existingUser: {
                username: existingUser.HTNO,
                email: existingUser.STUDENT_EMAIL,
                _id: existingUser.id,
              },
              token,
            });
          }
          return res.status(401).json({
            message: "Invalid details",
          });
        });
      })
      .catch(() =>
        res.status(500).json({
          message: "Our server is in the locker room, please do try again.",
        })
      );
  }
  

  async function seeUser(req, res) {
    try {
      const user = await Login.find({ HTNO: req.decoded.username });
  
      if (!user) throw Error("User Does not exist");
      res.json({ user: user[0] });
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
  }
  
  async function seeUserById(req, res) {
    try {
      const user = await Login.find({ HTNO: req.params.id });
  
      if (!user) throw Error("User Does not exist");
      res.json({ user: user[0] });
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
  }
  
  

  module.exports =  {loginUser :loginUser , seeUser : seeUser ,seeUserById : seeUserById} ;
