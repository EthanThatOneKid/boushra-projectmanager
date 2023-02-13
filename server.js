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

app.get('/', (req, res) => {
  /* We are reading the contents and then rendering all to the front end */
  try {
    renderingProjects = JSON.parse(fs.readFileSync('./public/projects.json'));
    renderingEmployees = JSON.parse(fs.readFileSync('./public/employees.json'));
  } catch (err) {
    console.log(err);
  }
  renderingProjects.reverse();
  renderingEmployees.reverse();

  res.render('index', {
    title: 'Homepage',
    renderingProjects,
    renderingEmployees,
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
  };
  renderingProjects.push(newProject);
  fs.writeFileSync(
    './public/projects.json',
    JSON.stringify(renderingProjects),
    'utf-8'
  );
});

app.get('/project/:id', (req, res) => {
  const id = req.params.id;
  let project;
  try {
    const projects = JSON.parse(fs.readFileSync('./public/projects.json'));

    // Find the project with the matching ID
    project = projects.find(p => p.id === id);
  } catch (err) {
    console.error(err);
  }

  res.render('projects.ejs', {
    title: 'Projects',
    project: project,
    id: id,
  });
});


app.post('/project/', (req, res) => {
  /* Looks at the post request and then parses it, reads file, pushes it, and then writes it into the projects.json */
  try {
    /* Reading file first in order to create a new updated Project, (looking at the contents) */
    renderingTasks = JSON.parse(fs.readFileSync('./public/tasks.json'));
  } catch (err) {
    console.error(err);
  }
  const task = {
    ...req.body,
    id: Date.now(),
  };
  renderingTasks.push(task);
  fs.writeFileSync(
    './public/tasks.json',
    JSON.stringify(renderingTasks),
    'utf-8'
  );
});

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
