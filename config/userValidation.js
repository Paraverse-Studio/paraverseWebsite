const registrationValidation = (req, res, next) => {
  let errors = [];

  const {
    firstName,
    lastName,
    email,
    username,
    password,
    confirmPassword,
  } = req.body;

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

  // return out if there are any errors with validation
  if (errors.length > 0) {
    console.log('errors');
    req.flash('error_msg', errors);
    return res.redirect('/account/register');
  }
  next();
};

module.exports = { registrationValidation };
