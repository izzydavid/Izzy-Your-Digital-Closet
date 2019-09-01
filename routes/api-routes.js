

// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");

var userEmail = "";
//
module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.json("/home");
  });
  //
  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function (req, res) {
    console.log(req.body);
    db.User.create({
      email: req.body.email,
      password: req.body.password
    }).then(function () {
      res.redirect(307, "/api/login");
    }).catch(function (err) {
      console.log(err);
      res.json(err);
      // res.status(422).json(err.errors[0].message);
    });
  });
  //
  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });
  //
  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    }
    else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id

      });
      userEmail = req.user.email;

    }
  });


  /////////////////////clothingggggggg//////////////////

  var express = require('express');
  var fileUpload = require('express-fileupload');

  var db = require('../models');

  // var app = express.app();

  // default options
  app.use(fileUpload());

  app.get("/api/home", function (req, res) {
    console.log(req.params.id, 'this');

    db.Cloths.findAll({
      where: {
        owner: userEmail,
        status: "active"
      }
    }).then(result => {
      res.json(result);
    }).catch((err) => {
      console.log(err);
    });
  })


  app.post('/upload', function (req, res) {
    if (Object.keys(req.files).length == 0) {
      return res.status(400).send('No files were uploaded.');
    }
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    var body = req.body;
    var type = body.dropdown;
    console.log("--------------------type--------------------------");
    console.log(type);
    console.log ("--------------------type--------------------------");
    let sampleFile = req.files.sampleFile;
    console.log("----------------------------------------------");
    console.log(sampleFile);
    console.log("----------------------------------------------");

    db.Cloths.findAll({
      // where: {
      //   id: req.params.id
      // }
    }).then(result => {
      var count = result.length;
      var picName = 'public/images/picture_' + count + '.jpg'


      // Use the mv() method to place the file somewhere on your server
      sampleFile.mv(picName, function (err) {
        if (err) {
          return res.status(500).send(err);
        }
        else {
          var body = {
            clothingLink: picName,
            owner: userEmail,
            status: "active",
            type: type
          
          }
          db.Cloths.create(body).then((result) => {
            // res.send('File uploaded!');
            res.redirect("/add")
          }).catch((err) => {
            console.log(err);
          });
        }
      });
    });
  });

  //  DELETE route for deleting picture
  app.delete("/api/home/:id", function (req, res) {
    db.Cloths.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbCloths) {
      res.json(dbCloths);
    });
  });

  // Donate route/////////
  app.put("/api/home/:id", function (req, res) {
  console.log(req.params)
  db.Cloths.update(
    {status: "donate"},
    {where:{id: req.params.id}}
  ).then(function (dbCloths) {
    res.json(dbCloths);
  })  
  
});

app.get("/api/donate", function (req, res) {
  console.log(req.params.id, 'this');
  db.Cloths.findAll({
    where: {
      owner: userEmail,
      status: "donate"
    }
  }).then(result => {
    res.json(result);
    console.log(result);
  }).catch((err) => {
    console.log(err);
  });
}) 
  
app.put("/api/home/:id", function (req, res) {
  console.log(req.params)
  db.Cloths.update(
  
    {status: "wear"},
    {where:{id: req.params.id}}
    
  ).then(function (dbCloths) {
    res.json(dbCloths);
  })  
app.get("/api/wear", function (req, res) {
  console.log(req.params.id, 'this');
  db.Cloths.findAll({
    where: {
      owner: userEmail,
      status: "wear"
    }
  }).then(result => {
    res.json(result);
    console.log(result);
  }).catch((err) => {
    console.log(err);
  });
})
  

  
});


};
