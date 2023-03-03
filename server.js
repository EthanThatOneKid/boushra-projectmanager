const express = require('express');
const mongoose = require('mongoose');
const { Project } = require('./model/model');
const fs = require('fs');

const app = express();
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.listen(3000);

/* Variables  */
let renderingProjects;
let renderingEmployees;
let companyNames = [];
let tasks = [];

/* Functions */


let Passcode = (length) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}


/* Server Side Logic */
app.get('/', (req, res) => {
  try {
    companyNames = JSON.parse(fs.readFileSync('./public/users.json'));
  } catch (err) {
    console.log(err);
  }
  res.render('signup', {
    title: "Sign Up",
    companyNames
  })
});

app.get('/login', (req, res) => {
  res.render('loginpage', {
    title: "Login",
  });
});

app.post('/homepage/:id', (req, res) => {
  try {
   companyNames = JSON.parse(fs.readFileSync('./public/users.json'));
  } catch (err) {
    console.log(err);
  }

  const newCompany = {
    ...req.body,
    passcode: Passcode(6),
    id: req.params.id,
  };
  
  companyNames.push(newCompany);
  fs.writeFileSync('./public/users.json', JSON.stringify(companyNames), 'utf-8');
  res.redirect(`/homepage/${req.params.id}`); 
});


app.get('/homepage/:id', (req, res) => {
  let id = req.params.id;
  /* We are reading the contents and then rendering all to the front end */
  try {
    renderingProjects = JSON.parse(fs.readFileSync('./public/projects.json'));
    renderingEmployees = JSON.parse(fs.readFileSync('./public/employees.json'));
    companyNames = JSON.parse(fs.readFileSync('./public/users.json'));
  } catch (err) {
    console.log(err);
  }

  const renderingFiltered = renderingEmployees.filter(element => {
    return element.id === id;
  });

  let renderingFilteredProjects = renderingProjects.filter(element => {
    return element.companyid === id;
  });


  renderingProjects.reverse();
  renderingEmployees.reverse();
  renderingFiltered.reverse();
  

  res.render('index', {
    title: 'Homepage',
    renderingProjects,
    renderingEmployees,
    renderingEmployees,
    renderingFiltered,
    renderingFilteredProjects,
    companyNames,
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



app.get('/project/:id', (req, res) => {
  try {
    /* Reading file first in order to create a new updated Project, (looking at the contents) */
    renderingProjects = JSON.parse(fs.readFileSync('./public/projects.json'));
  } catch (err) {
    console.log(err);
  }

  res.render('projects', { 
    renderingProjects,
    title: 'Project' 
  });
});



app.get('/project/:id', (req, res) => {
  try {
    tasks = JSON.parse(fs.readFileSync('./public/tasks.json'));
    res.render('projects.ejs', {
      title: 'Projects',
      tasks: tasks,
    });
  } catch (err) {
    console.log(err);
  }
});