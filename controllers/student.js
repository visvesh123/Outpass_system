const mongoose = require("mongoose");
const Outpass = require("../models/OutPass");

//TOKEN , ASN_DATE , HTNO , STUDENT_NAME ,BLOCK , ROOM , FROM , TO , REASON , APPROVED , USED , BATCH

var token = 0;

function createOutpass(req, res) {
  const { HTNO, STUDENT_NAME, BLOCK, ROOM, FROM, TO, REASON, BATCH } = req.body;

  const pass = {
    TOKEN: token,
    ASN_DATE: Date.now(),
    HTNO,
    STUDENT_NAME,
    BLOCK,
    ROOM,
    FROM,
    TO,
    REASON,
    APPROVED: "",
    USED: "False",
    BATCH 
  }

  Outpass.create( pass,  function (err, small) {
      if (err) return 0;
      console.log(small);
    }
  );

  token = token + 1 ;

  return res.json({
      msg : "Created pass succesfully",
      pass
  }).status(200)


}



module.exports = {
    createOutpass : createOutpass
}
