// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
module.exports = (req, res, next) => {
  //const bearerHeader = req.headers["authorization"];
  // console.log(req.headers.authorization);
  // const bearer = bearerHeader.split(" ");
  // const token = bearer[1];
  //const token = req.headers["x-access-token"];

  const token = req.headers["authorization"];
  // console.log(token);
  if (token) {
    jwt.verify(token, process.env.KEY, (err, decoded) => {
      if (err) {
        console.log(err)
        return res.status(401).json({
          message: "Authorization failed .. ", 
        });
      } else {
        console.log(decoded);
        req.decoded = decoded;
        next();
      } 
    });
  } else {
    return res.status(401).json({
      message: "Authorization failed...",
    });
  }
};
