import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from "../Components/Modals";

const EmployeeTable = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  // Fetch employees
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/employee");
        setEmployees(response.data.formattedResults);
      } catch (error) {
        console.error(error);
      }
    };
    fetchEmployees();
  }, []);

  // Delete employee
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/employee/${deleteId}`);
      setEmployees((prev) => prev.filter((emp) => emp.employeeId !== deleteId));
      setModalOpen(false);
      setDeleteId(null);
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  // Filtered employees for search
  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.employeeId.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header + Search */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h2 className="text-2xl font-bold">Employee</h2>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto items-center">
          <input
            type="search"
            placeholder="Search Employee"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border rounded-md w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={() => navigate("/add")}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <i className="bi bi-plus-circle"></i>
            <span>Add New Employee</span>
          </button>
        </div>
      </div>

      {/* Employee Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-lg divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Employee Name</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Employee ID</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Department</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Designation</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Project</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Type</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Status</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredEmployees.map((emp) => (
              <tr key={emp.employeeId} className="hover:bg-gray-50">
                <td className="px-4 py-2 flex items-center gap-2">
                  <img
                    src={emp.imageURL || "https://via.placeholder.com/40"}
                    alt="employee"
                    className="w-10 h-10 rounded-full"
                  />
                  <span className="text-sm font-light">{emp.name}</span>
                </td>
                <td className="px-4 py-2 text-sm font-light">{emp.employeeId || "N/A"}</td>
                <td className="px-4 py-2 text-sm font-light">{emp.department}</td>
                <td className="px-4 py-2 text-sm font-light">{emp.designation}</td>
                <td className="px-4 py-2 text-sm font-light">{emp.project}</td>
                <td className="px-4 py-2 text-sm font-light">{emp.type}</td>
                <td className="px-4 py-2 text-sm font-light">{emp.status}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button onClick={() => navigate(`/view/${emp.employeeId}`)} className="p-2 hover:bg-gray-200 rounded">
                    <i className="bi bi-eye"></i>
                  </button>
                  <button onClick={() => navigate(`/update/${emp.employeeId}`)} className="p-2 hover:bg-gray-200 rounded">
                    <i className="bi bi-pencil-square"></i>
                  </button>
                  <button
                    onClick={() => {
                      setDeleteId(emp.employeeId);
                      setModalOpen(true);
                    }}
                    className="p-2 hover:bg-red-100 text-red-600 rounded"
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Modal */}
      <Modal show={isModalOpen} onClose={() => setModalOpen(false)}>
        <div className="flex flex-col items-center text-center gap-4">
          <i className="bi bi-trash text-blue-600" style={{ fontSize: "50px" }}></i>
          <p>Are you sure you want to delete this employee?</p>
          <div className="flex gap-4 mt-4 w-full">
            <button
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </button>
            <button
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={handleDelete}
            >
              Yes
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default EmployeeTable;
