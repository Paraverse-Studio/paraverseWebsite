// allows use to use 'process.env.' to reference hidden variables in the .env file
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const app = express();
const mongoose = require('mongoose'); // allows us to connect and work with mongo db
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const userRoute = require('./routes/userRoute'); // contains all user account routes
// passport config
require('./config/passport')(passport);

// Listen to port 3000
const port = process.env.PORT || 3000; // get active environment port or port '3000'
app.listen(port, console.log(`listening to port ${port}`));

// Connect to Mongo DB
mongoose.connect(
  process.env.MONGO_URI, // Mongo DB URI
  {
    useNewUrlParser: true, // these are always required
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  console.log('Connection to Mongo DB established...')
);

// Middleware
app.set('view engine', 'ejs'); // sets view engine to ejs
app.use(express.static('public')); // sets the public folder as static (keep all js, imgs, styling in public folder)
app.use(morgan('dev')); // helps with console logging http requests
app.use(express.json()); // allows us to parse json data
app.use(express.urlencoded({ extended: true })); // allows us to use 'req.body' to request data posted by user
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// gobal vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.get('/', (req, res) => {
  res.redirect('/index');
});
app.get('/index', (req, res) => {
  res.render('index');
});
app.get('/apps', (req, res) => {
  res.render('apps');
});
app.get('/team', (req, res) => {
  res.render('team');
});
app.get('/play', (req, res) => {
  res.render('play');
});
app.get('/contact', (req, res) => {
  res.render('contact');
});
app.get('/privacy', (req, res) => {
  res.render('privacy');
});

// This runs all account routes found in the 'routes/userRoute.js' file
app.use('/account', userRoute);
