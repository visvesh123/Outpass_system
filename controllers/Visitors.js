const visitorSchema = require("../models/visitors");

function postVisitors(req, res) {
  const details = req.body;

  visitorSchema.create(details, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
}
module.exports = { postVisitors: postVisitors };
