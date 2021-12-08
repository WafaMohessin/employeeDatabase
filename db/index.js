const connection =  require('./connection');

class DB {
    constructor(connection){
        this.connection = connection;
    }

    findAllEmployees(){
        return this.connection.promise().query('SELECT employee.id, employee.first_name, employee.last_name, role.title AS title, department.name AS department, role.salary AS salary, concat(manager.first_name, " ", manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id;');
    }

    findAllDepartments() {
        return this.connection.promise().query('SELECT * FROM department;')
    }

    findAllRoles() {
        return this.connection.promise().query('SELECT role.id, role.title, role.salary, department.name AS department FROM role LEFT JOIN department ON role.department_id = department.id;')
    }

    addDepartment(department) {
        return this.connection.promise().query('INSERT INTO department SET ?', department);
    }

    
    addRole(role) {
        return this.connection.promise().query('INSERT INTO role (title, salary, department_id) VALUES ', role);
    }

    addEmployee(employee) {
        return this.connection.promise().query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ', employee);
    }

    updateEmployeeRole () {
        return this.connection.promise().query('UPDATE employee SET role_id ?', employee);
    }
    

}

module.exports = new DB(connection)