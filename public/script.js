// close error messages
const closeErrorButtons = document.querySelectorAll('.error-button');
// nav bar consts
const navMenuBtn = document.getElementById('navMenuBtn');
const navMenuLinks = document.querySelectorAll('.menu-link');
const navMenuWindow = document.querySelector('.nav-menu-window');

// close nav menu window
const closeMenuWindow = () => {
  navMenuWindow.classList.remove('open-menu');
};

// max-width for menu button
let x = window.matchMedia('(max-width: 1000px)');

mediaQuery(x);
x.addEventListener('change', mediaQuery);

// close menu window when width exceeds menu window
function mediaQuery(x) {
  if (!x.matches) {
    closeMenuWindow();
  }
}

// close error messages
closeErrorButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    e.preventDefault();

    e.target.parentElement.classList.add('hide');
  });
});

// toggle nav links with nav menu button
navMenuBtn.addEventListener('click', () => {
  navMenuWindow.classList.toggle('open-menu');
});

navMenuLinks.forEach((navLink) => {
  navLink.addEventListener('click', () => {
    closeMenuWindow();
  });
});
