var express = require('express');
var router = express.Router();
var auth = require('../auth');

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.session.username) {
    res.render('index', {
      title: 'Home'
    });
    return;
  }
  res.render('signin', {
    title: 'Login'
  });

});

router.get('/signin', function(req, res, next) {
  if (req.session.username) {
    res.render('index', {
      title: 'Home'
    });
    return;
  }
  res.render('signin', {
    title: 'Login'
  });

});


router.get('/signout', function(req, res, next) {
  console.log('session=', req.session);
  req.session.destroy();
  res.redirect('/');
});

router.post('/signin', function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  auth(username, password, function(err) {
    console.log('error=', err);
    if (err) {
      res.render('signin', {
        title: 'Sign in',
        message: err.message
      });
      return;
    }

    req.session.username = username;
    res.redirect('/');

  });

});
module.exports = router;
