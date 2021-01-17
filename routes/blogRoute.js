// ################### THIS FILE CONTAINS ALL THE USER ACCOUNT ROUTES ###################//
const router = require('express').Router();
const bcrypt = require('bcrypt'); // required to 'hash' user 'passwords' for 'user security'
const passport = require('passport');
const User = require('../models/userSchema');
const jwt = require('jsonwebtoken'); // required to 'authorize' user to 'private routes'
const { registrationValidation } = require('../config/userValidation');
const { checkAuthenticated, checkNotAuthenticated } = require('../config/auth');

router.get('/blog', (req, res) => {
  errors = [];
  res.render('../views/blog.ejs', {
    title: 'Blogs',
    errors,
    user: req.user,
  });
});

module.exports = router;
