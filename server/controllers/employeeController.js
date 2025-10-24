import db from '../config/db.js';

const BASE_URL = `http://localhost:5000`;

// Create Employee
export const createEmployee = async (req, res) => {
  const { name, department, designation, project, type, status, employeeId } = req.body;
  const image = req.file ? req.file.filename : null;

  if (!name || !department || !designation || !project || !type || !status) {
    return res.status(400).json({ message: "All fields are required including image." });
  }

  const query = `INSERT INTO employee (employeeId, name, department, designation, project, type, status, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(query, [employeeId, name, department, designation, project, type, status, image], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }
    res.status(201).json({ message: "Employee created successfully" });
  });
};

// Get all Employees
export const getAllEmployees = async (req, res) => {
  const query = `SELECT * FROM employee`;

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }

    const formattedResults = results.map(emp => ({
      ...emp,
      imageURL: emp.image ? `${BASE_URL}/uploads/${emp.image}` : null
    }));

    res.status(200).json({ formattedResults });
  });
};

// Get single Employee
export const getEmployee = async (req, res) => {
  const { id } = req.params;
  const query = `SELECT * FROM employee WHERE employeeId = ?`;

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const formattedResults = results.map(emp => ({
      ...emp,
      imageURL: emp.image ? `${BASE_URL}/uploads/${emp.image}` : null
    }));

    res.status(200).json({ formattedResults });
  });
};

// Update Employee
export const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, department, designation, project, type, status } = req.body;
  const image = req.file ? req.file.filename : null;

  const updates = [];
  const values = [];

  if (name) { updates.push('name = ?'); values.push(name); }
  if (department) { updates.push('department = ?'); values.push(department); }
  if (designation) { updates.push('designation = ?'); values.push(designation); }
  if (project) { updates.push('project = ?'); values.push(project); }
  if (type) { updates.push('type = ?'); values.push(type); }
  if (status) { updates.push('status = ?'); values.push(status); }
  if (image) { updates.push('image = ?'); values.push(image); }

  if (updates.length === 0) {
    return res.status(400).json({ message: "No valid fields to update" });
  }

  const sql = `UPDATE employee SET ${updates.join(', ')} WHERE employeeId = ?`;
  values.push(id);

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json({ message: "Employee updated successfully" });
  });
};

// Delete Employee
export const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM employee WHERE employeeId = ?`;

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json({ message: "Employee deleted successfully" });
  });
};

