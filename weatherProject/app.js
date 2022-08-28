const express = require("express");
const https = require("https");
const { runInNewContext } = require("vm");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  var location = req.body.cityName;

  console.log(location);

  const url =
    "https://api.openweathermap.org/data/2.5/weather?APPID=4a12a18255da786b3dd32e8512b6ecba&units=metric" +
    "&q=" +
    location;
  https.get(url, function (response) {
    console.log(response.statusCode);
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const icon = weatherData.weather[0].icon;
      const imgurl = "http://openweathermap.org/img/wn/" + icon + "@4x.png";
      console.log(temp);
      res.write("<h1> Current weather of " + location + " is:</h1>");
      res.write("<h2>" + weatherData.weather[0].description + "</h2>");
      res.write("<h2>Temperature is " + temp + "</h2>");
      res.write("<img src=" + imgurl + ">");
      res.send();
    });
  });
});
app.listen(process.env.PORT || 3000, function () {
  console.log("server running on port 3k.");
});
