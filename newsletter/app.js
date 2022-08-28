const express = require("express");

const bodyParser = require("body-parser");

const request = require("request");

// const { get } = require("request");

const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/failure", function (req, res) {
  res.redirect("/");
});

app.post("/", function (req, res) {
  var firstname = req.body.fname;
  var lastname = req.body.lname;
  var email = req.body.email;
  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstname,
          LNAME: lastname,
        },
      },
    ],
  };

  var jsondata = JSON.stringify(data);
  const url = "https://us17.api.mailchimp.com/3.0/lists/3160c2e70c";

  const options = {
    method: "POST",
    auth: "Abhishek1:6915f1aa60d5bec56baceae1d82985c5-us17",
  };

  const request = https.request(url, options, function (response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });
  request.write(jsondata);
  request.end();
});

app.listen(process.env.PORT || 3000, function () {
  console.log("3k port is going on!");
});
