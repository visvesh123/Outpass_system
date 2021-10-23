const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
// import dotenv from "dotenv";
dotenv.config();
const key = process.env.KEY;
const Token = (id, username) =>
  jwt.sign({ id, username }, key, { expiresIn: "2h" });

//console.log(Token);
// export default Token;

module.exports = Token;
