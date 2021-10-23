const mongoose = require('mongoose')
const Outpass = require('../models/OutPass');
const security = require('../models/security')


function seeApprovedLeaves(req,res){
    Outpass.find({APPROVED : "True" , USED : "False"})
    .then(results => {
 
     res.json({
         approved_leaves : results
     }).status(200)
    })
    .catch(err => {
        console.log(err)
 
        return res.json({
            msg : err
        }).status(400)
    })
 }

 function updateApprovedLeave(req,res){
    const token = req.body.token 
    const status = req.body.status
    const htno = req.body.htno
    const asn = req.body.asn
    console.log(token , status , htno , asn)
    if(status === "exited"){
        
        Outpass.findOneAndUpdate({HTNO : htno , TOKEN : token , ASN_DATE : asn},{"$set":{USED : "True"}}).then(val => {
            res.json({
                msg : "Student Left",
                token,
                val : val
            });

        })
       
         
    }
 }

 const addChecking = (req, res) => {
    const test = Date.now();
    //   if (req.data.length == 0) {
    //     return res.json({
    //       msg: "Not found",
    //     });
  
    var branch;
    //   console.log(req.data);
    if (req.data.length == 0) {
      return res.json({
        msg: "Couldn't find",
      });
    }
    //   console.log(id[7]);
    const digit = req.body.username[7];
    if (digit == "1") {
      branch = "CIVIL";
    } else if (digit == "2") {
      branch = "EEE";
    } else if (digit == "3") {
      branch = "MECH";
    } else {
      branch = "CSE";
    }
  
    
    security.create(
      {
        HTNO: req.body.username,
        STUDENT_NAME: req.data[0].STUDENT_NAME,
        BRANCH: branch,
        MOVING: req.body.MOVING,
        REMARKS: req.body.REMARKS,
        DATE: test,
        BATCH: req.data[0].BATCH,
      },
      (err, done) => {
        if (err) {
          res.json({
            msg: err.message,
          });
        } else {
          res.json({
            msg: "Added Succesfully",
          });
        }
      }
    );
  };
 
 module.exports = {
     seeApprovedLeaves : seeApprovedLeaves,
     updateApprovedLeave : updateApprovedLeave,
     addChecking : addChecking

 }