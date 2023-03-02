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
app.listen(3000);


const LoadData = (fileName, id) => {
  const data = JSON.parse(fs.readFileSync(`./public/${fileName}.json`));
  const projectData = data.find(p => p.id === Number(id));
  return projectData;
}

let companyNames = [];

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

app.post('/homepage/:id', (req, res) => {
  try {
    let companyNames = JSON.parse(fs.readFileSync('./public/users.json'));
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
  renderingProjects.reverse();
  renderingEmployees.reverse();

  res.render('index', {
    title: 'Homepage',
    renderingProjects,
    renderingEmployees,
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



app.get('/project/:id', (req, res) => {
  let id = req.params.id;
  let project = LoadData("project", id);
  res.render('projects', { 
    project,
    title: 'Project' });
});


let tasks = [];
app.get('/project/:id/', (req, res) => {
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
