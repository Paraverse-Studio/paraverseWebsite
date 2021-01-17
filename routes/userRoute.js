// ################### THIS FILE CONTAINS ALL THE USER ACCOUNT ROUTES ###################//
const router = require('express').Router();
const bcrypt = require('bcrypt'); // required to 'hash' user 'passwords' for 'user security'
const passport = require('passport');
const User = require('../models/userSchema');
const jwt = require('jsonwebtoken'); // required to 'authorize' user to 'private routes'
const { registrationValidation } = require('../config/userValidation');
const { checkAuthenticated, checkNotAuthenticated } = require('../config/auth');

router.get('/register', checkNotAuthenticated, (req, res) => {
  errors = [];
  res.render('../views/account/register', { title: 'Register', errors });
});

router.get('/login', checkNotAuthenticated, (req, res) => {
  errors = [];
  res.render('../views/account/login', { title: 'Login', errors });
});

router.get('/', checkAuthenticated, (req, res) => {
  res.render('../views/account/account', { title: 'Account' });
});

router.post('/register', checkNotAuthenticated, async (req, res) => {
  // 'registration information' entered by user which we can 'request' from the 'body'
  let errors = [];

  const {
    firstName,
    lastName,
    email,
    username,
    password,
    confirmPassword,
  } = req.body;

  // validate user registration information
  if (
    !firstName ||
    !lastName ||
    !email ||
    !username ||
    !password ||
    !confirmPassword
  )
    errors.push('Not all fields have been entered');
  if (username.length <= 5)
    errors.push('Username must contain at least 6 characters');
  if (password.length <= 7)
    errors.push('Password must contain at least 8 characters');
  if (password.search(/[a-z]/i) < 0)
    errors.push('Password must contain at least one letter');
  if (password.search(/[0-9]/) < 0)
    errors.push('Password must contain at least one digit');
  if (password !== confirmPassword) errors.push('Passwords do not match');
  if (password === username || password === firstName || password === lastName)
    errors.push(
      'Password can not match your first name, last name or username'
    );

  const usernameExists = await User.findOne({ username });
  if (usernameExists)
    errors.push('Email already exists, use a different email');

  // return out if there are any errors with validation
  if (errors.length > 0) {
    return res.render('../views/account/register', {
      title: 'Register',
      errors,
    });
  }

  // hash password for user security
  const hashedPassword = await bcrypt.hash(password, 10);

  // pass user registration info into 'userSchema' model for Mongo DB storage
  const user = new User({
    firstName,
    lastName,
    email,
    username,
    password: hashedPassword, // pass hashed password instead of actual password for user security (incase of database breach)
  });

  // save user into Mongo DB
  const savedUser = await user.save();
  // redirect user to login page
  req.flash('success_msg', 'You are now registered and can log in');
  res.redirect('/account/login');
});

router.post('/login', checkNotAuthenticated, (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/account',
    failureRedirect: '/account/login',
    failureFlash: true,
  })(req, res, next);
});

module.exports = router;
