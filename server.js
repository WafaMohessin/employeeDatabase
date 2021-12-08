const inquirer = require("inquirer");
require("console.table");
const db = require("./db");

const prompts = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "prompt",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "View All Departments",
          "View All Roles",
          "Add Department",
          "Add Role",
          "Add Employee",
          "Update Employee Role",
          "Quit",
        ],
      },
    ])

    .then((answers) => {
      if (answers) {
        switch (answers.prompt) {
          // View all employees
          case "View All Employees":
            viewAllEmployees();
            break;
          // case 'Add Employee':
          //     addEmployeePrompt();
          // break;
          // case 'Update Employee Role':
          //     updateEmployeePrompt();
          // break;
          // // View All roles
          case "View All Roles":
            getRoles();
            break;
          // case 'Add Role':
          //     addRolePrompt();
          // break;
          // // View All Departments
          case "View All Departments":
            getDepartments();
            break;
          case "Add Department":
            createDepartment();
            break;
          case "Quit":
            process.exit();
        }
      }
    });
};

function viewAllEmployees() {
  db.findAllEmployees()
    .then(([data]) => {
      console.table(data);
    })
    .then(() => prompts());
}

function getDepartments() {
  db.findAllDepartments()
    .then(([data]) => {
      console.table(data);
    })
    .then(() => prompts());
}

function getRoles() {
  db.findAllRoles()
    .then(([data]) => {
      console.table(data);
    })
    .then(() => prompts());
}

function createDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the name of the department?",
      },
    ])
    .then((answers) => {
        let name = answers;
      db.addDepartment(name)
        .then(() => console.log(`Added ${name.name} to the database`))
        .then(() => prompts());
    });
}

// const getEmployees = () => {
//     db.query(`SELECT id,
//     concat(employee.first_name, ' ', employee.last_name) AS full_name
//     FROM employee`, (err, results) => {
//         results.forEach(e => {
//             employees.push({name: e.full_name, value: e.id});
//         });
//     })
// };

// const deptListing =  () => {
//     db.query(`SELECT * FROM department`, (err, results) => {
//         results.forEach(e => {
//             depts.push({name: e.name, value: e.id});
//         })
//     })
// };

// const rolesListing = () => {
//     db.query(`SELECT id, title FROM role`, (err, results) => {
//         results.forEach(e => {
//             roles.push({name: e.title, value: e.id});
//         })
//     })
// };

// const managersListing = () => {
//     db.query(`SELECT id,
//     concat(employee.first_name, ' ', employee.last_name) AS name
//     FROM employee`, (err, results) => {
//         results.forEach(e => {
//             managers.push({name: e.name, value: e.id});
//         })
//     })
// };

// const rolePrompt = [

//     {
//         type: 'input',
//         name: 'title',
//         message: 'What is the name of the role?'
//     },
//     {
//         type: 'input',
//         name: 'salary',
//         message: 'What is the salary of the role?'
//     },
//     {
//         type: 'list',
//         name: 'department_id',
//         message: 'Which department does the role belong to?',
//         choices: depts
//     }

// ];

// const employeePrompt = [
//     {
//         type: 'input',
//         name: 'first_name',
//         message: `What is the employee's first name?`
//     },
//     {
//         type: 'input',
//         name: 'last_name',
//         message: `What is the employee's last name?`
//     },
//     {
//         type: 'list',
//         name: 'role',
//         message: `What is the employee's role?`,
//         choices: roles
//     },
//     {
//         type: 'list',
//         name: 'manager',
//         message: `Who is the employee's manager?`,
//         choices: managers
//     }
// ];

// const employeeUpdatePrompt = [
//     {
//         type: 'list',
//         name: 'employee',
//         message: `Which employee's role do you want to update?`,
//         choices: employees
//     },
//     {
//         type: 'list',
//         name: 'role',
//         message: `Which role do you want to assign the selected employee?`,
//         choices: roles
//     }
// ];

// function addRolePrompt() {
//     deptListing();
//     inquirer.prompt(rolePrompt).then(answers => {
//         if (answers) {
//             // Adding role to the database
//             db.query(`INSERT INTO role (title, salary, department_id) VALUES ('${answers.name}', '${answers.salary}', '${answers.department}')`, (err, results) => {
//                 console.log(`Added ${answers.name} to the database`)
//             })
//             getEmployees();
//             prompts();
//         }
//     })
// };

// function addEmployeePrompt() {
//     rolesListing();
//     managersListing();
//     inquirer.prompt(employeePrompt).then(answers => {
//         if (answers) {
//             // Adding role to the database
//             db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${answers.first_name}', '${answers.last_name}', ${answers.role}, ${answers.manager})`, (err, results) => {
//                 console.log(`Added ${answers.first_name} ${answers.last_name} to the database`);
//             })
//             getEmployees();
//             prompts();
//         }
//     })
// };

// function updateEmployeePrompt() {
//     rolesListing();
//     inquirer.prompt(employeeUpdatePrompt).then(answers => {
//         if (answers) {
//             //Adding role to the database
//             db.query(
//                 `UPDATE employee SET role_id = ${answers.role} WHERE id =  '${answers.employee}'`, (err, results) => {
//                 console.log(`Updated employee's role`);
//             })
//             prompts();
//         }
//     })
// };
// getEmployees();
prompts();
