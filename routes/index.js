var express = require('express');
var router = express.Router();
const authMiddleware = require('../middlewares/auth');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/dashboard', authMiddleware.loginRequired, function(req, res, next) {
  
  const data = {};

  data.title = 'Dashboard';
  data.user = req.user;

  res.render('dashboard', data);
  
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/register', function(req, res, next) {
  res.render('register');
});

router.get('/edit', authMiddleware.loginRequired, function(req, res, next) {
  
  const data = {};

  data.title = 'Edit';
  data.user = req.user;

  res.render('edit', data);
  
});


module.exports = router;
