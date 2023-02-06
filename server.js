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
let renderingProjects = [];
let renderingEmployees = [];
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

app.post('/project', (req, res) => {
  /* Looks at the post request and then parses it, reads file, pushes it, and then writes it into the projects.json */
  try {
    /* Reading file first in order to create a new updated Project, (looking at the contents) */
    renderingProjects = JSON.parse(fs.readFileSync('./public/projects.json'));
  } catch (err) {
    console.error(err);
  }
  renderingProjects.push(req.body);
  fs.writeFileSync(
    './public/projects.json',
    JSON.stringify(renderingProjects),
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
