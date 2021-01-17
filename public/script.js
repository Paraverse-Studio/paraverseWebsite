const closeErrorButtons = document.querySelectorAll('.error-button');

// close error messages
closeErrorButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    e.preventDefault();

    e.target.parentElement.classList.add('hide');
  });
});
