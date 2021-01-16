// ################### THIS FILE CONTAINS ALL THE USER ACCOUNT ROUTES ###################//
const router = require('express').Router();
const User = require('../models/userSchema');
const bcrypt = require('bcrypt'); // required to 'hash' user 'passwords' for 'user security'
const jwt = require('jsonwebtoken'); // required to 'authorize' user to 'private routes'
const { registrationValidation } = require('../config/userValidation');

router.get('/register', (req, res) => {
  errors = [];
  res.render('../views/account/register', { title: 'Register', errors });
});

router.get('/login', (req, res) => {
  errors = [];
  res.render('../views/account/login', { title: 'Login', errors });
});

router.get('/', (req, res) => {
  res.render('../views/account/account', { title: 'Account' });
});

router.post('/register', registrationValidation, async (req, res) => {
  // 'registration information' entered by user which we can 'request' from the 'body'
  const { firstName, lastName, email, username, password } = req.body;

  // validate user registration information

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
  return res.redirect('/account/login');
});

router.post('/login', async (req, res) => {
  // get username and password value
  // 'login information' entered by user which we can 'request' from the 'body'
  const { username, password } = req.body;
  let errors = [];

  // validate login form
  // check if all fields have been filled
  if (!username || !password) errors.push('Not all fields have been entered'); // if either username or password is null, response with a status of 400 and return a msg

  // find the 'user' in Mongo DB by comparing username details
  const user = await User.findOne({ username: username });
  if (!user) errors.push('No account with this username has been registered');

  if (errors.length > 0) {
    console.log('errors');
    return res.render('../views/account/login', {
      title: 'Login',
      errors,
    });
  }
  // compare user entered 'password' with the 'hashed password' in Mongo DB
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    errors.push('Invalid credentials');
    return res.render('../views/account/login', {
      title: 'Login',
      errors,
    });
  }

  // sign an access token for user identification
  const accessToken = jwt.sign(
    { id: user._id },
    process.env.ACCESS_TOKEN_SECRET
  );
  // redirect user to account page with the following json data
  res.redirect('/account');
});

module.exports = router;
