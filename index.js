const inquirer = require('inquirer');
const fs = require('fs');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern')
const Manager = require('./lib/Manager');

const employees = [];

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


const writeEmployee = (employees) => {
    const employeeArrayOfCardTemplates = employees.map((employee) => {
        let specialTemp;

        switch (employee.getRole()) {
            case "Manager":
                specialTemp = `
                <li class="list-group-item m-3">Office Number: ${employee.officeNumber}</li>
                `
                break;
            case "Engineer":
                specialTemp = `
                <li class="list-group-item m-3">GitHub: <a href='https://github.com/${employee.github}'>${employee.github}</a></li>
                `
                break;
            case "Intern":
                specialTemp = `
                <li class="list-group-item m-3">School: ${employee.school}</li>
                `
                break;
            default:
                break;
        }

        return `
        <div class="card col-3 m-4 shadow-sm" style="width: 18rem;">
            <div class="card-body p-0">
                <div class="card-header bg-primary">
                    <h5 class="card-title text-white">${employee.name}</h5>
                    <h6 class="card-subtitle mb-2 text-white">${employee.getRole()}</h6>
                </div>
                <li class="list-group-item m-3">ID: ${employee.id}</li>
                <li class="list-group-item m-3">Email: <a href='mailto: ${employee.email}'>${employee.email}</a></li>
                ${specialTemp}
            </div>
        </div>
        
        `
    });


    return `
    <!DOCTYPE html>
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
        <header style="height: 10rem; display: flex; justify-content: center; align-items: center" class='bg-danger'>
            <h1 class="text-white">My Team</h1>
        </header>
        <main class='cards row justify-content-center'>
        ${employeeArrayOfCardTemplates.join("")}
        </main>
        <script src="./index.js"></script>
    </body>
    </html>
    `;
}

const writeHTML = () => {
    fs.writeFile('myteam.html', writeEmployee(employees), err => {
        if (err) {
            throw err;
        }
    })
    
}

