const inquirer = require('inquirer');
const fs = require('fs');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern')
const Manager = require('./lib/Manager');

const employees = [];
const cards = [];

class InquirerQ {
    constructor(type, message, name) {
    this.type = type,
    this.message = message,
    this.name = name
    }
}
class ChoiceQ extends InquirerQ {
    constructor(type, message, name, choices) {
        super(type, message, name)
        this.choices = choices;
    }
}

const addManager = () => {
    inquirer.prompt([
        new InquirerQ('input', `What is your manager's name?`, `name`),
        new InquirerQ('input', `What is their ID?`, 'id'),
        new InquirerQ('input', `What is their email?`, 'email'),
        new InquirerQ('input', `What is the office number?`, 'office')
    ])
    .then(answer => {
        employees.push(new Manager(answer.name, answer.id, answer.email, answer.office))
        console.log(employees)
        addEmployee();
    })
    .catch(err => {
        throw err
    })
}

const addEmployee = () => {
    inquirer.prompt([
        new ChoiceQ('list', 'Would you like to add an Engineer, or an Intern?', 'addemp', ['Engineer', 'Intern', 'Finish'])
    ])
    .then(answer => {
        if (answer.addemp === 'Engineer') {
            addEngineer();
        } else if (answer.addemp === 'Intern') {
            addIntern();
        } else {
            writeHTML();
        }
    })
    .catch(err => {
        throw err
    })
}

const addEngineer = () => {
    inquirer.prompt([
        new InquirerQ('input', `What is your Engineer's name?`, `name`),
        new InquirerQ('input', `What is their ID?`, 'id'),
        new InquirerQ('input', `What is their email?`, 'email'),
        new InquirerQ('input', `What is their Github username?`, 'github')
    ])
    .then(answer => {
        employees.push(new Engineer(answer.name, answer.id, answer.email, answer.github))

        console.log(employees)
        addEmployee();
    })
    .catch(err => {
        throw err
    })
}

const addIntern = () => {
    inquirer.prompt([
        new InquirerQ('input', `What is your Intern's name?`, `name`),
        new InquirerQ('input', `What is their ID?`, 'id'),
        new InquirerQ('input', `What is their email?`, 'email'),
        new InquirerQ('input', `What school do they go to?`, 'school')
    ])
    .then(answer => {
        employees.push(new Intern(answer.name, answer.id, answer.email, answer.school))
        console.log(employees)
        addEmployee();
    })
        .catch(err => {
        throw err
    })
}


addManager();

const htmlOutline = 
`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- CSS only -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous">
    <title>Team Profiles</title>
</head>
<body>
    <header>
        <h1>My Team</h1>
    </header>
    <main class='cards row justify-content-center'>`

const htmlEnd = `
        </main>
        <script src="./index.js"></script>
    </body>
    </html>`


const writeEmployee = (employee) => {
    const employeeHTML =
        `<div class="card col-3">
        <h4 class="card-header">${employee.name}</h5>
        <h5 class="card-header">${employee.getRole()}</h5>
        <div class="card-body">
        <h5 class="card-title">Special title treatment</h5>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
        </div>`
    return employeeHTML;

}
const writeHTML = () => {
    fs.writeFile('myteam.html', htmlOutline, err => {
        if (err) {
            throw err;
        }
    })
    fs.readFile('myteam.html', 'utf8', err => {
        if (err) {
            throw err;
        }
    })
    //  how to append to page specific to subclass? Create different string template literals for each?
    for (const employee of employees) {
        console.log(employee)
        fs.appendFile('myteam.html', writeEmployee(employee), (err) => {
            if (err) {
                throw err;
            }
        })
        
    }
    // how to do this without awkard html end append?
    fs.appendFile('myteam.html', htmlEnd, (err) => {
        if (err) {
            throw err;
        }
    })


}