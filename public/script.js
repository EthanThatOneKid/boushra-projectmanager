/* This is for the modal window opening */

let modal = document.querySelector('.modal');
let overlay = document.querySelector('.overlay');
let add = document.querySelector('.add');
let employeeOverlay = document.querySelector('.employeeOverlay');
let projectForm = document.querySelector('form');

add.addEventListener('click', () => {
  modal.classList.toggle('hidden');
  overlay.classList.toggle('hidden');
});

const CloseModule = () => {
  modal.classList.toggle('hidden');
  overlay.classList.toggle('hidden');
};

const CloseEmployeeModule = () => {
  employeeModal.classList.toggle('hidden');
  employeeOverlay.classList.toggle('hidden');
};

overlay.addEventListener('click', CloseModule);
employeeOverlay.addEventListener('click', CloseEmployeeModule);

document.addEventListener('keydown', (e) => {
  if (e.key == 'Escape' && !modal.classList.contains('hidden')) {
    CloseModule();
  }
});

/* Adding Employee Btns */
let employeeBtn = document.querySelector('.add-employee-btn');
let employeeForm = document.querySelector('.form-employee');
let employeeModal = document.querySelector('.employee');
let total = document.querySelector('span');

employeeBtn.addEventListener('click', () => {
  employeeModal.classList.toggle('hidden');
  employeeOverlay.classList.toggle('hidden');
});

/* Attempting to use JSON before using MongoDB */
/* Sending a POST request for the backend to use */
let formData1;
employeeForm.addEventListener('submit', (e) => {
  let formData1 = new FormData(employeeForm);
  let data = Object.fromEntries(formData1);
  //dataArray.push(data);

  fetch('http://localhost:3000/employee', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data).toLowerCase(),
  });

  console.log('Button clicked');
});

projectForm.addEventListener('submit', (e) => {
  const formData = new FormData(projectForm);
  const data = Object.fromEntries(formData);
  console.log(data);

  fetch('http://localhost:3000/project', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data).toLowerCase(),
  });
  console.log('Button clicked');
});

/* This will be for the search bar */

/*
If the input/ value of the search bar is equivalent to one of the names letters
 */
// let arraySearch = Array.of(search.value);

let employeeContainer = document.querySelector('.movements');
let search = document.querySelector('.search-bar');
let dataArray = [];
search.addEventListener('input', (e) => {
fetch('./employees.json')
  .then((response) => response.json())
  .then((data) => {
    data.forEach(employee => {
      if (employee.employee.includes(search.value.toLowerCase())) {
        dataArray.push(employee);
      }
    });
    const filteredEmployees = Array.from(employeeContainer).filter(element => {
      const employee = dataArray.find(e => e.employee === element.textContent);
      console.log(employee)
    });

    });
  });

// /* Adding their own pages */
// let projects = document.querySelectorAll('.projects');
// projects.forEach((project, index) => {
//   project.addEventListener('click', () => {
//     fetch('/projects.json')
//       .then((response) => response.json())
//       .then((d) => {
//         console.log(`${d[index].project} was clicked.`);
//       });
//   });
// });
