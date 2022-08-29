const express = require("express");
const bodyParser = require("body-parser");
const app = express();
let workItems = [];
var listItems = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  var today = new Date();
  var options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  var day = today.toLocaleDateString("en-US", options);
  console.log(day);
  res.render("list", { listTitle: day, newListItem: listItems });
});

app.post("/", function (req, res) {
  var list = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(list);
    res.redirect("/work");
  } else {
    listItems.push(list);
    res.redirect("/");
  }
});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", newListItem: workItems });
});

app.post("/work", function (req, res) {
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/");
});

app.get("/about", function (req, res) {
  res.render("about");
});
app.listen(3000, function () {
  console.log("affermative confirmation.server is started at port 3k.");
});
