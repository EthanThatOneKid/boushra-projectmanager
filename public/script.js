/* This is for the modal window opening */

let modal = document.querySelector('.modal');
let overlay = document.querySelector('.overlay');
let add = document.querySelector('.add');
add.addEventListener('click', () => {
  modal.classList.toggle('hidden');
  overlay.classList.toggle('hidden');
});

const CloseModule = () => {
  modal.classList.toggle('hidden');
  overlay.classList.toggle('hidden');
};

overlay.addEventListener('click', CloseModule);

document.addEventListener('keydown', (e) => {
  if (e.key == 'Escape' && !modal.classList.contains('hidden')) {
    CloseModule();
  }
});

/* Attempting to use JSON before using MongoDB */
/* Sending a POST request for the backend to use */

let form = document.querySelector('form');
form.addEventListener('submit', (e) => {
  /* I want to refresh everytime they make a new project! */
  /* This also works then the inputs will be refreshed as well */
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  console.log(data);

  fetch('http://localhost:3000', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  console.log('Button clicked');
});

/* Adding their own pages */
let projects = document.querySelectorAll('.projects');
projects.forEach((project, index) => {
  project.addEventListener('click', () => {
    fetch('/projects.json')
      .then((response) => response.json())
      .then((d) => {
        console.log(`${d[index].project} was clicked.`);
      });
  });
});
