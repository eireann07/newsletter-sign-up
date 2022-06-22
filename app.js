//lines 3-10 = Node.js boilerplate

const express = require("express");
const https = require("https");
const request = require("request");
const bodyParser = require("body-parser");
const mailchimp = require("@mailchimp/mailchimp_marketing");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

mailchimp.setConfig({
  apiKey: "05a04d56c8db5281d3563e6173f196ef-us14",
  server: "us14"
})

app.post("/", function (req, res){
  const firstName = req.body.firstName;
  const secondName = req.body.secondName;
  const email = req.body.email;

  const listID = "ca7031b7ff";

  const subscribingUser = {
    firstName: firstName,
    lastName: secondName,
    email: email
  };

    async function run() {
      const response = await mailchimp.lists.addListMember("list_id", {
      email_address: subscribingUser.email,
      status: "subscribed",
      merge_fields: {
        FNAME: subscribingUser.firstName,
        LNAME: subscribingUser.lastName
        }
      });
      console.log("Successfully added contact as an audience member. The contact's id is " +
      response.id);
      res.sendFile(__dirname + "/success.html")
  }
  run().catch(e => res.sendFile(__dirname + "/failure.html"));
});


app.listen(process.env.PORT || 3000, function(){
  console.log("Server now running.");
});



