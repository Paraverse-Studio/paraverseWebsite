function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/account/login');
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect('/account');
  }

  next();
}

module.exports = { checkAuthenticated, checkNotAuthenticated };
