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
          // // View All Departments
          case "View All Departments":
            getDepartments();
            break;
          // // View All roles
          case "View All Roles":
            getRoles();
            break;
          // View all employees
          case "View All Employees":
            viewAllEmployees();
            break;
          case "Add Department":
            createDepartment();
            break;
          case "Add Role":
            createRole();
            break;
          case "Add Employee":
            createEmployee();
            break;
          case "Update Employee Role":
            employeeUpdate();
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

function createRole() {
  db.findAllDepartments().then(([data]) => {
    const deptChoices = data.map(({ id, name }) => ({
      name: name,
      value: id,
    }));

    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "What is the name of the role?",
        },
        {
          type: "input",
          name: "salary",
          message: "What is the salary?",
        },
        {
          type: "list",
          name: "department_id",
          message: "What department does the role belong to?",
          choices: deptChoices,
        },
      ])
      .then((answers) => {
        db.addRole(answers)
          .then(() => console.log(`Added ${answers.title} to the database`))
          .then(() => prompts());
      });
  });
}


function createEmployee() {
  db.findAllRoles().then(([data]) => {
    const roleChoices = data.map(({ id, name }) => ({
      name: name,
      value: id,
    }))
    db.findAllEmployees().then(([data]) => {
      const managerChoices = data
      //.filter(({role}) => role == "manager")
      .map(({ id, name }) => ({
        name: name,
        value: id,
      }))
      inquirer
      .prompt([
                {
                  type: 'input',
                  name: 'first_name',
                  message: `What is the employee's first name?`,
                },
               {
                   type: 'input',
                   name: 'last_name',
                   message: `What is the employee's last name?`,
               },
               {
                   type: 'list',
                   name: 'role_id',
                   message: `What is the employee's role?`,
                   choices: roleChoices,
               },
               /* {
                 type: 'list',
                 name: 'manager',
                 message: `Who is the employee's manager?`,
                 choices: managerChoices,
               }, */
          ])
        
      .then((answers) => {
        db.addEmployee(answers)
          .then(() => console.log(`Added ${answers.first_name} to the database`))
          .then(() => prompts());
      }) 
    })
  })
}

function employeeUpdate (){
  
  inquirer
    .prompt([
            {
                type: 'list',
                name: 'employee_id',
                message: `Which employee's role do you want to update?`,
                choices: employees
             },
            {
                type: 'list',
                name: 'role_id',
                message: `Which role do you want to assign the selected employee?`,
                choices: roles
            }
        ])

    .then((answers) => {
      db.updateEmployee(answers.role_id, answer.employee_id)
        .then(() => console.log(`Updated ${answers.employee_id} to the database`))
        .then(() => prompts());
    });
}

prompts();
