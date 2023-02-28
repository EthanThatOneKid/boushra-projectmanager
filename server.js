const express = require('express');
const mongoose = require('mongoose');
const { Project } = require('./model/model');
const fs = require('fs');

const app = express();
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static('public'));

// /* Ignore the MONGODB, I will use this later! */
// const mongoDB =
//   'mongodb+srv://BoushraBlog:boushrabettir@projectmanager.np7shhg.mongodb.net/blogs?retryWrites=true&w=majority';
// async function ConnectionMongo() {
//   try {
//     await mongoose.connect(mongoDB);
//     app.listen(3000); //infers local host
//     console.log('connected to mongo');
//   } catch (error) {
//     console.log(error);
//   }
// }

// ConnectionMongo();
let renderingProjects;
let renderingEmployees;
let renderingTasks = [];
app.listen(3000);

// app.get('/', (req, res) => {
//   res.render('signup', {
//     title: 'SignUp'
//   })
// });

// let company_name;
// app.post('/', (req, res) => {
//   try {
//     company_name = JSON.parse(fs.readFileSync('./public/users.json'))
//   } catch (err) {
//     console.log(err);
//   }

//   company_name.push(req.body);
//   fs.writeFileSync(
//     './public/users.json',
//     JSON.stringify(company_name),
//     'utf-8'
//   );

// })

let companyNames = [];

app.get('/', (req, res) => {
  try {
    companyNames = JSON.parse(fs.readFileSync('./public/users.json'));
  } catch (err) {
    console.log(err);
  }
  res.render('signup', {
    title: "SignUp",
    companyNames
  })
})
/*

Random Generator

*/

let Passcode = (length) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

const companies = {};

app.post('/', (req, res) => {
  try {
    companyNames = JSON.parse(fs.readFileSync('./public/users.json'));
  } catch (err) {
    console.log(err);
  }

  // Create new company object
  const newCompany = {
    companyName: req.body.companyName,
    passcode: Passcode(6),
    employees: [],
    projects: []
  };
  
  // Add new company to companies object
  companies[newCompany.companyName] = newCompany;

  // Add new company to companyNames array
  companyNames.push(newCompany);

  // Save updated companyNames array to users.json file
  fs.writeFileSync(
    './public/users.json',
    JSON.stringify(companyNames),
    'utf-8'
  );

  res.redirect('/:id');
});



app.get('/:id', (req, res) => {
  let id = req.params.companyName;
  /* We are reading the contents and then rendering all to the front end */
  try {
    renderingProjects = JSON.parse(fs.readFileSync('./public/projects.json'));
    renderingEmployees = JSON.parse(fs.readFileSync('./public/employees.json'));
    companyNames = JSON.parse(fs.readFileSync('./public/users.json'));
  } catch (err) {
    console.log(err);
  }
  renderingProjects.reverse();
  renderingEmployees.reverse();

  res.render('index', {
    title: 'Homepage',
    renderingProjects,
    renderingEmployees,
    companyNames
  });
});

app.post('/employee', (req, res) => {
  /* Looks at the post request and then parses it, reads file, pushes it, and then writes it into the employees.json */
  try {
    /* Reading file first in order to create a new updated Employee, (looking at the contents) */
    renderingEmployees = JSON.parse(fs.readFileSync('./public/employees.json'));
  } catch (err) {
    console.error(err);
  }
  renderingEmployees.push(req.body);
  fs.writeFileSync(
    './public/employees.json',
    JSON.stringify(renderingEmployees),
    'utf-8'
  );
});

// let id = 1;
app.post('/project', (req, res) => {
  /* Looks at the post request and then parses it, reads file, pushes it, and then writes it into the projects.json */
  try {
    /* Reading file first in order to create a new updated Project, (looking at the contents) */
    renderingProjects = JSON.parse(fs.readFileSync('./public/projects.json'));
  } catch (err) {
    console.error(err);
  }

  const newProject = {
    ...req.body,
    id: Date.now(),
    date: new Date().toLocaleDateString('en-US')
  };

  renderingProjects.push(newProject);
  fs.writeFileSync(
    './public/projects.json',
    JSON.stringify(renderingProjects),
    'utf-8'
  );
});



const loadProjectData = (id) => {
  const projectsData = JSON.parse(fs.readFileSync('./public/projects.json'));
  const projectData = projectsData.find(p => p.id === Number(id));
  return projectData;
}

app.get('/project/:id', (req, res) => {
  let id = req.params.id;
  let project = loadProjectData(id);
  res.render('projects', { 
    project,
    title: 'Project' });
});

// app.post('/', (req, res) => {
//   let id = req.params.id;
//   try {
//     const tasks = JSON.parse(fs.readFileSync('./public/tasks.json'));
//     const newTask = res.body;
//     tasks.push(newTask);
//     fs.writeFileSync('./public/tasks.json', JSON.stringify(tasks), 'utf-8');
    
//   } catch (err) {
//     console.log(err);
   
//   }
// });


// app.get(`/`, async (req, res) => {
//   const projectname = req.params.projectname;
//   fetch('./public/projects.json')
//     .then((response) => response.json())
//     .then((d) => {
//       const project = d.find((p) => p.project === projectname);
//       if (!project) {
//         return res.sendStatus(404);
//       }
//       res.render('projects', { project });
//     });
// });
