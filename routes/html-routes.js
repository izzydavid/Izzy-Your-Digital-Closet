
// Requiring path to so we can use relative routes to our HTML files
var path = require("path");
//
// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");
//
module.exports = function(app) {
//
  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/home");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });
//
  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/home");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });
//
  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be 
  //redirected to the signup page
  app.get("/add", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/add.html"))
});

app.get("/home", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/home.html"));
});

app.get("/donate", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/donate.html"));
});
  
app.get("/wear", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/wear.html"));
});  
  
};