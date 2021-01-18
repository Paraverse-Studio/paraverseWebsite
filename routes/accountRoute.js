// ################### THIS FILE CONTAINS ALL THE USER ACCOUNT ROUTES ###################//
const router = require('express').Router();
const bcrypt = require('bcrypt'); // required to 'hash' user 'passwords' for 'user security'
const passport = require('passport');
const User = require('../models/userSchema');
const { checkAuthenticated, checkNotAuthenticated } = require('../config/auth');

module.exports = router;
