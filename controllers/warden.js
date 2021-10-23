const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const Outpass = require("../models/OutPass");
const Vaccination = require("../models/vacStatus");

function seeAppliedLeaves(req, res) {
  Outpass.find({ APPROVED: "" })
    .then((results) => {
      res.json({
        applied_leaves: results,
      });
    })
    .catch((err) => {
      console.log(err);

      return res
        .json({
          msg: err,
        })
        .status(400);
    });
}

function seePastLeaves(req, res) {
  Outpass.find({ APPROVED: "" })
    .then((results) => {
      res.json({
        applied_leaves: results,
      });
    })
    .catch((err) => {
      console.log(err);

      return res
        .json({
          msg: err,
        })
        .status(400);
    });
}

function updateLeave(req, res) {
  const token = req.body.token;
  const status = req.body.status;
  const htno = req.body.htno;
  const asn = req.body.asn
  console.log(token, status, htno);
  if (status === "approved") {
    Outpass.findOneAndUpdate(
      { TOKEN: token, HTNO: htno , ASN_DATE : asn },
      { $set: { APPROVED: "True" } },
    ).then((val) => {
      res.json({
        msg: "Approved Succesfully",
        token,
        htno,
        val: val,
      });
    });
  } else if (status === "rejected") {
    Outpass.updateOne(
      { TOKEN: token, HTNO: htno },
      { $set: { APPROVED: "False" } },
    ).then((val) => {
      res.json({
        msg: "Rejected Succesfully",
        token,
        htno,
        val: val,
      });
    });
  }
}

function vaccinationStatus(req, res) {
  const username = req.params.id;
  Vaccination.find({ HTNO: username })
    .then((items) => res.json(items))
    .catch((err) => res.json({ err: err }).status(401));
}

function statusMail(req, res) {
  // define all the input variables
  const type = req.body.type;
  const desc = req.body.desc;
  const mail = req.body.mail;
  const from = req.body.from;
  const to = req.body.to;
  const token = req.body.token;
  const warden = req.body.warden;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "visveshnaraharisetty@gmail.com", // generated ethereal user
      pass: "qscgy@Q10", // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: "mecparentsportal@gmail.com", // sender address
    to: mail, // list of receivers
    subject: ` Your outing has been:  ${type}`, // Subject line
    text: `Token: ${token}
           Status: ${type}
           From: ${from}
           To: ${to}
           Reason: ${desc}
           Given By: ${warden}

           ***DO NOT REPLY***
           Contact: Sukesh Rakshit, Venu Gopal Dandu, Duty Warden
    `, // plain text body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    res.json({
      msg: "Mail sent",
    });
  });
}

module.exports = {
  seeAppliedLeaves: seeAppliedLeaves,
  seePastLeaves: seePastLeaves,
  updateLeave: updateLeave,
  vaccinationStatus: vaccinationStatus,
  statusMail: statusMail,
};
