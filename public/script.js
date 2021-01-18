const closeErrorButtons = document.querySelectorAll('.error-button');

// change button containers
const firstNameChangeButtonContainers = document.querySelector(
  '.first-name-change-btn-container'
);
const lastNameChangeButtonContainers = document.querySelector(
  '.last-name-change-btn-container'
);
const usernameChangeButtonContainers = document.querySelector(
  '.username-change-btn-container'
);
const emailChangeButtonContainers = document.querySelector(
  '.email-change-btn-container'
);
// edit buttons
const editFirstNameButton = document.querySelector('.edit-first-name');
const editLastNameButton = document.querySelector('.edit-last-name');
const editUsernameButton = document.querySelector('.edit-username');
const editEmailButton = document.querySelector('.edit-email');
// apply buttons
const applyChangesFirstNameButton = document.querySelector('.apply-first-name');
const applyChangesLastNameButton = document.querySelector('.apply-last-name');
const applyChangesUsernameButton = document.querySelector('.apply-username');
const applyChangesEmailButton = document.querySelector('.apply-email');
// cancel buttons
const cancelChangesFirstNameButton = document.querySelector(
  '.cancel-first-name'
);
const cancelChangesLastNameButton = document.querySelector('.cancel-last-name');
const cancelChangesUsernameButton = document.querySelector('.cancel-username');
const cancelChangesEmailButton = document.querySelector('.cancel-email');
// edit inputs
const firstNameInput = document.querySelector('.first-name-data-input');
const lastNameInput = document.querySelector('.last-name-data-input');
const usernameInput = document.querySelector('.username-data-input');
const emailInput = document.querySelector('.email-data-input');
// user data displays
const firstNameDisplay = document.querySelector('.first-name-data-display');
const lastNameDisplay = document.querySelector('.last-name-data-display');
const usernameDisplay = document.querySelector('.username-data-display');
const emailDisplay = document.querySelector('.email-data-display');

// close error messages
closeErrorButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    e.preventDefault();

    e.target.parentElement.classList.add('hide');
  });
});

// edit first name in account page
editFirstNameButton.addEventListener('click', (e) => {
  e.preventDefault();

  // close the other inputs and buttons
  lastNameDisplay.classList.remove('hide');
  usernameDisplay.classList.remove('hide');
  emailDisplay.classList.remove('hide');
  lastNameInput.classList.add('hide');
  usernameInput.classList.add('hide');
  emailInput.classList.add('hide');
  lastNameChangeButtonContainers.classList.add('hide');
  usernameChangeButtonContainers.classList.add('hide');
  emailChangeButtonContainers.classList.add('hide');
  editLastNameButton.classList.remove('hide');
  editUsernameButton.classList.remove('hide');
  editEmailButton.classList.remove('hide');

  // hide edit button, display apply & cancel buttons
  editFirstNameButton.classList.add('hide');
  firstNameChangeButtonContainers.classList.remove('hide');

  // toggle show input, hide user data display
  firstNameDisplay.classList.add('hide');
  firstNameInput.classList.remove('hide');
});

// apply changes to email in account page
applyChangesFirstNameButton.addEventListener('click', (e) => {
  e.preventDefault();

  // close the other inputs and buttons
  lastNameDisplay.classList.remove('hide');
  usernameDisplay.classList.remove('hide');
  emailDisplay.classList.remove('hide');
  lastNameInput.classList.add('hide');
  usernameInput.classList.add('hide');
  emailInput.classList.add('hide');
  lastNameChangeButtonContainers.classList.add('hide');
  usernameChangeButtonContainers.classList.add('hide');
  emailChangeButtonContainers.classList.add('hide');

  // hide apply & cancel buttons, show edit button
  firstNameChangeButtonContainers.classList.add('hide');
  editFirstNameButton.classList.remove('hide');

  // hide input, show user data display
  firstNameInput.classList.add('hide');
  firstNameDisplay.classList.remove('hide');
});

// edit last name in account page
editLastNameButton.addEventListener('click', (e) => {
  e.preventDefault();

  // close the other inputs and buttons
  firstNameDisplay.classList.remove('hide');
  usernameDisplay.classList.remove('hide');
  emailDisplay.classList.remove('hide');
  firstNameInput.classList.add('hide');
  usernameInput.classList.add('hide');
  emailInput.classList.add('hide');
  firstNameChangeButtonContainers.classList.add('hide');
  usernameChangeButtonContainers.classList.add('hide');
  emailChangeButtonContainers.classList.add('hide');
  editFirstNameButton.classList.remove('hide');
  editUsernameButton.classList.remove('hide');
  editEmailButton.classList.remove('hide');

  // hide edit button, display apply & cancel buttons
  editLastNameButton.classList.add('hide');
  lastNameChangeButtonContainers.classList.remove('hide');

  // toggle show input, hide user data display
  lastNameDisplay.classList.add('hide');
  lastNameInput.classList.remove('hide');
});

// apply changes to email in account page
applyChangesLastNameButton.addEventListener('click', (e) => {
  e.preventDefault();

  // close the other inputs
  firstNameDisplay.classList.remove('hide');
  usernameDisplay.classList.remove('hide');
  emailDisplay.classList.remove('hide');
  firstNameInput.classList.add('hide');
  usernameInput.classList.add('hide');
  emailInput.classList.add('hide');
  firstNameChangeButtonContainers.classList.add('hide');
  usernameChangeButtonContainers.classList.add('hide');
  emailChangeButtonContainers.classList.add('hide');

  // hide apply & cancel buttons, show edit button
  lastNameChangeButtonContainers.classList.add('hide');
  editLastNameButton.classList.remove('hide');

  // hide input, show user data display
  lastNameInput.classList.add('hide');
  lastNameDisplay.classList.remove('hide');
});

// edit username in account page
editUsernameButton.addEventListener('click', (e) => {
  e.preventDefault();

  // close the other inputs
  firstNameDisplay.classList.remove('hide');
  lastNameDisplay.classList.remove('hide');
  emailDisplay.classList.remove('hide');
  firstNameInput.classList.add('hide');
  lastNameInput.classList.add('hide');
  emailInput.classList.add('hide');
  firstNameChangeButtonContainers.classList.add('hide');
  lastNameChangeButtonContainers.classList.add('hide');
  emailChangeButtonContainers.classList.add('hide');
  editFirstNameButton.classList.remove('hide');
  editLastNameButton.classList.remove('hide');
  editEmailButton.classList.remove('hide');

  // hide edit button, display apply & cancel buttons
  editUsernameButton.classList.add('hide');
  usernameChangeButtonContainers.classList.remove('hide');

  // toggle show input, hide user data display
  usernameDisplay.classList.add('hide');
  usernameInput.classList.remove('hide');
});

// apply changes to email in account page
applyChangesUsernameButton.addEventListener('click', (e) => {
  e.preventDefault();

  // close the other inputs
  firstNameDisplay.classList.remove('hide');
  lastNameDisplay.classList.remove('hide');
  usernameDisplay.classList.remove('hide');
  firstNameInput.classList.add('hide');
  lastNameInput.classList.add('hide');
  usernameInput.classList.add('hide');
  firstNameChangeButtonContainers.classList.add('hide');
  lastNameChangeButtonContainers.classList.add('hide');
  emailChangeButtonContainers.classList.add('hide');

  // hide apply & cancel buttons, show edit button
  usernameChangeButtonContainers.classList.add('hide');
  editUsernameButton.classList.remove('hide');

  // hide input, show user data display
  usernameInput.classList.add('hide');
  usernameDisplay.classList.remove('hide');
});

// edit email in account page
editEmailButton.addEventListener('click', (e) => {
  e.preventDefault();

  // close the other inputs
  firstNameDisplay.classList.remove('hide');
  lastNameDisplay.classList.remove('hide');
  usernameDisplay.classList.remove('hide');
  firstNameInput.classList.add('hide');
  lastNameInput.classList.add('hide');
  usernameInput.classList.add('hide');
  firstNameChangeButtonContainers.classList.add('hide');
  lastNameChangeButtonContainers.classList.add('hide');
  usernameChangeButtonContainers.classList.add('hide');
  editFirstNameButton.classList.remove('hide');
  editLastNameButton.classList.remove('hide');
  editUsernameButton.classList.remove('hide');

  // hide edit button, display apply & cancel buttons
  editEmailButton.classList.add('hide');
  emailChangeButtonContainers.classList.remove('hide');

  // toggle show input, hide user data display
  emailDisplay.classList.add('hide');
  emailInput.classList.remove('hide');
});

// apply changes to email in account page
applyChangesEmailButton.addEventListener('click', (e) => {
  e.preventDefault();

  // close the other inputs
  firstNameDisplay.classList.remove('hide');
  lastNameDisplay.classList.remove('hide');
  usernameDisplay.classList.remove('hide');
  firstNameInput.classList.add('hide');
  lastNameInput.classList.add('hide');
  usernameInput.classList.add('hide');
  firstNameChangeButtonContainers.classList.add('hide');
  lastNameChangeButtonContainers.classList.add('hide');
  usernameChangeButtonContainers.classList.add('hide');

  // hide apply & cancel buttons, show edit button
  emailChangeButtonContainers.classList.add('hide');
  editEmailButton.classList.remove('hide');

  // hide input, show user data display
  emailInput.classList.add('hide');
  emailDisplay.classList.remove('hide');
});
