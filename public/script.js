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
let searchBarProject = document.querySelector('.search-bar-project');

/* Employee VV */

let employeeBtn = document.querySelector('.add-employee-btn');
let employeeOverlay = document.querySelector('.employeeOverlay');
let employeeForm = document.querySelector('.form-employee');
let employeeContainerMovement = document.querySelector('.movements');
let employeeModal = document.querySelector('.employee');
let employeeRow = document.querySelector('.movements__row');
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
const companyID = window.location.pathname.split('/').pop();
console.log(companyID);
/* Sending a POST request for the backend to use */
employeeForm.addEventListener('submit', (e) => {
  let formData1 = new FormData(employeeForm);
  data = Object.fromEntries(formData1);
  let newData = {
    ...data,
    id: companyID
  };

  fetch('http://localhost:3000/employee', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newData).toLowerCase(),
  });
});

projectForm.addEventListener('submit', (e) => {
  const formData = new FormData(projectForm);
  const data = Object.fromEntries(formData);
  let newData = {
    ...data,
    companyID: companyID
  };
console.log(`Company data is : ${newData.companyID}`)
  fetch('http://localhost:3000/project', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newData).toLowerCase(),
  });
});



/* funcition */



/* This will be for the search bar */

const showResults = (search) => {
  fetch('./employees.json')
    .then((response) => response.json())
    .then((data) => {
      let filteredData = data.filter((element) => {
        element.employee.includes(search.value);

      });
      let htmlLiteral = '';
      if (filteredData.length > 0) {
        filteredData.forEach((element) => {
          htmlLiteral += `
        <div class="movements__row">
        <div class="name" id="name">
        ${element.employee}
        </div>
        <div class="position" id="position">
        ${element.position}
        </div>
        <div class="status" id="position">
        ${element.status}
        </div>
        </div>
        `;
        });
      } else {
        htmlLiteral = `
      <div class = 'add-employee'>
      <h2>Uh oh, no matching employees!</h2> 
      <h6> Try again, check the retired employees page, or add an employee!</h6>
    </div>
      `;
      }
      employeeContainerMovement.innerHTML = htmlLiteral;
    });
};




let employeeContainer = document.querySelector('.movements');
let search = document.querySelector('.search-bar');
search.addEventListener('input', (e) => {
  showResults(search);
});

/* UI Bar */

let clickable = document.querySelector('.clickcable');
let navBar = document.querySelector('ul');
clickable.addEventListener('click', (e) => {
  navBar.style.display = navBar.style.display === 'none' ? 'inline' : 'none';
});

// let user_form = document.querySelector('.user_form');
// let username = document.querySelector('.username_input');
// let code_input = document.querySelector('.code_input');

// user_form.addEventListener('submit', (e) => {
//   e.preventDefault();
//   console.log('submitted')
// })


// let company_output = document.querySelector('.company_output');
// fetch('./users.json')
//   .then((response) => response.json())
//   .then((data) => {
//     data.forEach((company) => {
//       // Create a unique username based on the company name
//       const username = company.companyName.toLowerCase().replace(/\s/g, '');

//       // Add the username property to the company object
//       company.username = username;

//       // Display the company object in the DOM
//       const companyDiv = document.createElement('div');
//       companyDiv.innerHTML = `
//         <h2>${company.companyName}</h2>
//         <p>Username: ${company.username}</p>
//         <p>Passcode: ${company.passcode}</p>
//       `;
//       company_output.appendChild(companyDiv);
//     });
//   });




/*

if(companyInput.value.length > 0) {
      let randomPin = Math.random();
      outputCompanyCode.textContent = randomPin;
      console.log(randomPin);
     
    }




- Make sure the length of the valye is > 0
- remove the sign i nstuff
- Generate the pin code
- ok button
  - it puts them to the homepage
`
*/



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

/*
--- attempt 1 --------
        fetch('./employees.json')
    .then((response) => response.json())
    .then((data) => {
      let finalData = [];
      for (let { employee, index } of data) {
        finalData.push(employee);
      }
      console.log(finalData);
      finalData.filter((elem, index) => {
        if (elem === search.value) {
          console.log('Ya did it mate!');
        }
      });

         
    });
      -----------attempt 2---------------
      fetch('./employees.json')
    .then((response) => response.json())
    .then((data) => {
      let finalData = [];
      for (let { employee, index } of data) {
        finalData.push(employee);
      }
      finalData.filter((elem, index) => {
        if (elem.includes(search.value)) {


          console.log(`${elem} : ${search.value}`);
          employeeContainerMovement.textContent = elem;
        }
      });

      
          if the current element inclues search.value
          console.log('u did it') else continue

          OR

          lets do .find()? 
          -> Nope it did not work. Rather use this way instead
         *
    });
      */
