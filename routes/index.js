var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', user: null, count: null });
});

router.post('/', function(req, res, next) {
  var db = req.db;
  var collection = db.get('usercollection');
  var username = req.body.username;
  var email = req.body.email;
  var session = req.session;

  console.log("New Subscriber: " );
  console.log("username: " + username + "  email: " + email);

  // Submit to the DB
  collection.insert({
    "username" : username,
    "email" : email
  }, function (err, doc) {
    if (err) {
      // If it failed, return error
      res.send("There was a problem adding the information to the database.");
    } else {
      session.email = email;
      res.render('index', { title: 'You are Subscribed !',
        user: {
          username: username,
          email : email
        }
      });
    }
  });
});

module.exports = router;
