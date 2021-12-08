INSERT INTO department (name)
VALUES 
('Sale'), 
('Marketing'),
('Collision'),
('Customer Services');

INSERT INTO role 
(title, salary, department_id)
VALUES 
('Sale Manager', 5000.00, 1),
('Sale Consultant', 5000.00,1),
('Marketing Manager', 5500.00, 2),
('Marketing Coordinator', 5500.00, 2),
('Collision Director', 6000.00, 3),
('Mechanicman', 6000.00, 3),
('Customer Services Manager', 6500.00, 4),
('Customer Services Rep', 6500.00, 4);

INSERT INTO employee 
(first_name, last_name, role_id, manager_id)
VALUES 
('Jose', 'Lopez', 1, NULL),
('Alex', 'Smith', 1, 1),
('Josh','Rock', 2, NULL),
('Moon', 'Patrick',2,2),
('Hassan', 'Adel', 3, NULL),
('Hamzah', 'Hassan', 3, 3),
('Wafa', 'Mohessin',4, NULL),
('Zahraa', 'Maymoon',4,4);

