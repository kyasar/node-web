var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.send() and .render() -> terminates the flow
  var session = req.session;
  if (session.email) {
    console.log("Session was created !");
    res.render('index', { title: 'Welcome', user: null, count: null });
  }
  else {
    console.log("Session NOT created !");
    res.render('subscribe', { title: 'Subscribe' });
  }

});

module.exports = router;
