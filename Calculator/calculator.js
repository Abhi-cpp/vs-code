const express = require("express");
var bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/bmicalculator.html");
});
app.post("/", function (req, res) {
  var weight = Number(req.body.weight);
  var height = Number(req.body.height);
  var result = weight / (height * height);
  res.send("you bmi is : " + result.toFixed(2));
});
app.listen(3000, function () {
  console.log("server started!");
});
