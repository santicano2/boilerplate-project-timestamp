// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date?", function (req, res) {
  let inputDate = req.params.date;
  let date;

  // If no date is provided, use current date
  if (!inputDate) {
    date = new Date();
  } else {
    // Check if input is a numeric string (potential Unix timestamp)
    if (/^\d+$/.test(inputDate)) {
      // Convert to number and create date from Unix timestamp
      date = new Date(parseInt(inputDate));
    } else {
      // Try to parse as a date string
      date = new Date(inputDate);
    }
  }

  // Check if date is valid
  if (isNaN(date)) {
    return res.json({ error: "Invalid Date" });
  }

  // Return Unix timestamp and UTC string
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
