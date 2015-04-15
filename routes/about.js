var express = require('express');
var router = express.Router();
var url = require('url');

/* GET about page. */
router.get('/', function(req, res, next) {
  // var query = require('url').parse(req.url, true).query;
  // console.log("query: " + query.firstname + " " + query.lastname);
  var db = req.db;
  var collection = db.get('usercollection');

  // Then list the database
  collection.find({},{},function(e,docs){
    res.render('about', {
      title: 'Subscribers',
      "userlist" : docs
    });
  });

});

/* incoming POST request to this page */
router.post('/', function(req, res, next) {
  res.render('about', { title: 'Insert', name: req.body.firstname + " " + req.body.lastname });
});

module.exports = router;
