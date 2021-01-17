// allows only logged in users to access a specific route
function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/account/login');
}

// allows only logged out users to access a specific route
function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect('/account');
  }

  next();
}

module.exports = { checkAuthenticated, checkNotAuthenticated };
