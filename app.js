const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");
const port = 3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => res.sendFile(__dirname + "/signup.html"));

app.post("/", (req, res) => {
  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.email;

  var data = {
    member: [
      {
        email_address: email,
        status: "subscribed"
      }
    ]
  };

  var jsonData = JSON.stringify(data);

  var options = {
    url: "https://us4.api.mailchimp.com/schema/3.0/Lists/0097d0a58c",
    method: "POST",
    headers: {
      Authorization: "Oikwunze b2895bcdb05bd93420cc1f4fc14e9ad2-us4"
    },
    body: jsonData
  };

  request(options, function(error, response, body) {
    if (error) {
      res.sendFile(__dirname + "/failure.html");
    } else {
      res.sendFile(__dirname + "/success.html");
    }
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
