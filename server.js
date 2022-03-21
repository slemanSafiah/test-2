var express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
var app = express();
var requestIp = require("request-ip");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

app.use(express.static("public"));

app.get("/api/whoami", (req, res) => {
  res.json({
    ipaddress: requestIp.getClientIp(req),
    language: req.headers["accept-language"],
    software: req.headers["user-agent"],
  });
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// * process.env.PORT

var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
