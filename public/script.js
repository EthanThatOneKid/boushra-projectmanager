/* This is for the modal window opening */

let modal = document.querySelector('.modal');
let overlay = document.querySelector('.overlay');
let add = document.querySelector('.add');

/* Location VV */
let locationOverlay = document.querySelector('.locationOverlay');
let locationModal = document.querySelector('.location-modal');
let locationOutput = document.querySelector('.location');
let removeBtn = document.querySelector('.remove');
let formLocation = document.querySelector('.form-location');
let addBtnLocation = document.querySelector('.add-btns-location');
let locationBtn = document.querySelector('.chg-btn');
let locationInput = document.querySelector('.location-field');
let i = 0;
let newLocations = [];

/* Project  VV */

let projectForm = document.querySelector('form');

/* Employee VV */

let employeeBtn = document.querySelector('.add-employee-btn');
let employeeOverlay = document.querySelector('.employeeOverlay');
let employeeForm = document.querySelector('.form-employee');
let employeeModal = document.querySelector('.employee');
let total = document.querySelector('span');
let employeeArray = [];
let data;

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

const CloseLocationModule = () => {
  locationModal.classList.toggle('hidden');
  locationOverlay.classList.toggle('hidden');
};

overlay.addEventListener('click', CloseModule);
employeeOverlay.addEventListener('click', CloseEmployeeModule);
locationOverlay.addEventListener('click', CloseLocationModule);

document.addEventListener('keydown', (e) => {
  if (e.key == 'Escape' && !modal.classList.contains('hidden')) {
    CloseModule();
  }
});

/* Adding Location Static Data */

locationBtn.addEventListener('click', () => {
  locationModal.classList.toggle('hidden');
  locationOverlay.classList.toggle('hidden');
});

removeBtn.addEventListener('click', () => {
  locationModal.classList.remove('hidden');
  locationOverlay.classList.remove('hidden');
});

/* Attempted using localStorage for the first time! */

addBtnLocation.addEventListener('click', () => {
  if (locationInput) {
    newLocations[i] = { name: formLocation.locationName.value };
    localStorage.setItem('newLocations', JSON.stringify(newLocations));
  }
});

window.onload = () => {
  let storedLocations = JSON.parse(localStorage.getItem('newLocations')) || [];
  /* Wow should I delete the short circuiting operator should I should I not hmm */
  if (storedLocations?.length > 0) {
    newLocations = storedLocations;
    i = storedLocations.length;
    locationOutput.textContent = newLocations[newLocations.length - 1].name;
  }
};

/* Adding Employee Btns */

employeeBtn.addEventListener('click', () => {
  employeeModal.classList.toggle('hidden');
  employeeOverlay.classList.toggle('hidden');
});

/* Attempting to use JSON before using MongoDB */
/* Sending a POST request for the backend to use */
employeeForm.addEventListener('submit', (e) => {
  let formData1 = new FormData(employeeForm);
  data = Object.fromEntries(formData1);
  employeeArray.push({ ...data, id: Date.now() });

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

/* This is for projects */

/* Remove Btns For Employees */

/* This will be for the search bar */

/*
If the input/ value of the search bar is equivalent to one of the names letters
 */
// let arraySearch = Array.of(search.value);

// let employeeContainer = document.querySelector('.movements');
// let search = document.querySelector('.search-bar');
// let dataArray = [];
// search.addEventListener('input', (e) => {
//   fetch('./employees.json')
//     .then((response) => response.json())
//     .then((data) => {
//       data.forEach((employee) => {
//         if (employee.employee.includes(search.value.toLowerCase())) {
//           dataArray.push(employee);
//         }
//       });
//       const filteredEmployees = Array.from(employeeContainer).filter(
//         (element) => {
//           const employee = dataArray.find(
//             (e) => e.employee === element.textContent
//           );
//           console.log(employee);
//         }
//       );
//     });
// });

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
