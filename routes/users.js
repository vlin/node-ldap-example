var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  if(req.session.username){
    //res.send('respond with a resource');
    res.render('users', {title: 'User list'});
  } else {
    res.redirect('/');
  }
});

module.exports = router;
