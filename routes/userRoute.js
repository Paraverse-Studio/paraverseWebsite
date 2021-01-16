// ################### THIS FILE CONTAINS ALL THE USER ACCOUNT ROUTES ###################//
const router = require('express').Router();
const User = require('../models/userSchema');
const bcrypt = require('bcrypt'); // required to 'hash' user 'passwords' for 'user security'
const jwt = require('jsonwebtoken'); // required to 'authorize' user to 'private routes'

router.get('/account/register', (req, res) => {
  res.render('../views/account/register', { title: 'Register' });
});

router.get('/account/login', (req, res) => {
  res.render('../views/account/login', { title: 'Login' });
});

router.get('/account', (req, res) => {
  res.render('../views/account/account', { title: 'Account' });
});

router.post('/account/register', async (req, res) => {
  // 'registration information' entered by user which we can 'request' from the 'body'
  const {
    firstName,
    lastName,
    email,
    username,
    password,
    confirmPassword,
  } = req.body;

  let errors = [];

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
  if (password === username || password === firstName || password || lastName)
    errors.push(
      'Password can not match your first name, last name or username'
    );

  // return out if there are any errors with validation
  if (errors.length > 0) {
    console.log('errors');
    return res.render('../views/account/register.ejs', {
      title: 'Register',
      errors,
    });
  }

  console.log('no errors');
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

router.post('/account/login', async (req, res) => {
  // get username and password value
  // 'login information' entered by user which we can 'request' from the 'body'
  const { username, password } = req.body;

  // validate login form
  // check if all fields have been filled
  if (!username || !password)
    return res.status(400).json({ msg: 'Not all fields have been entered' }); // if either username or password is null, response with a status of 400 and return a msg

  // find the 'user' in Mongo DB by comparing username details
  const user = await User.findOne({ username: username });
  if (!user)
    return res
      .status(400)
      .json({ msg: 'No account with this username has been registered' });

  // compare user entered 'password' with the 'hashed password' in Mongo DB
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

  // sign an access token for user identification
  const accessToken = jwt.sign(
    { id: user._id },
    process.env.ACCESS_TOKEN_SECRET
  );
  // redirect user to account page with the following json data
  res.redirect('/account', { firstName, lastName, username });
});

module.exports = router;
