import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from "./modals/Modal"

const EmployeeTable=()=> {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState([]);
  const [isModal, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/employee");
        setEmployee(response.data.formattedResults || []);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    fetchEmployee();
  }, []);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/employee/${deleteId}`);
      setEmployee((prev) => prev.filter((emp) => emp.employeeId !== deleteId));
      setModalOpen(false);
      setDeleteId(null);
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const filteredEmployees = employee.filter((emp) =>
    [
      emp.name,
      emp.employeeId?.toString(),
      emp.department,
      emp.designation,
      emp.project,
      emp.type,
      emp.status,
    ]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold text-gray-800">Employee</h2>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <input
            type="search"
            placeholder="Search Employee"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button
            onClick={() => navigate("/add")}
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <i className="bi bi-plus-circle text-lg"></i>
            <span className="ml-2">Add New</span>
          </button>
        </div>
      </div>

      {/* Employee Table */}
      <div className="mt-8 overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100 border-b">
            <tr>
              {[
                "Employee Name",
                "Employee ID",
                "Department",
                "Designation",
                "Project",
                "Type",
                "Status",
                "Action",
              ].map((header, index) => (
                <th
                  key={index}
                  className="px-4 py-3 text-sm font-medium text-gray-600"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((emp, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="flex items-center gap-3 px-4 py-3">
                    <img
                      src={emp.imageURL || "https://via.placeholder.com/40"}
                      alt="employee"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <span className="text-gray-700">{emp.name}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{emp.employeeId}</td>
                  <td className="px-4 py-3 text-gray-600">{emp.department}</td>
                  <td className="px-4 py-3 text-gray-600">{emp.designation}</td>
                  <td className="px-4 py-3 text-gray-600">{emp.project}</td>
                  <td className="px-4 py-3 text-gray-600">{emp.type}</td>
                  <td className="px-4 py-3 text-gray-600">{emp.status}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          navigate(`/view/${emp.employeeId}`)
                        }
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <i className="bi bi-eye"></i>
                      </button>
                      <button
                        onClick={() =>
                          navigate(`/update/${emp.employeeId}`)
                        }
                        className="text-green-500 hover:text-green-700"
                      >
                        <i className="bi bi-pencil-square"></i>
                      </button>
                      <button
                        onClick={() => {
                          setDeleteId(emp.employeeId);
                          setModalOpen(true);
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className="text-center text-gray-500 py-6 text-sm"
                >
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Modal */}
      <Modal show={isModal} onClose={() => setModalOpen(false)}>
        <div className="flex flex-col items-center text-center">
          <i className="bi bi-trash text-red-500 text-4xl mb-3"></i>
          <p className="text-gray-700 mb-4">
            Are you sure you want to delete this employee?
          </p>
          <div className="flex gap-3 w-full">
            <button
              onClick={() => setModalOpen(false)}
              className="w-1/2 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="w-1/2 px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
            >
              Yes, Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default EmployeeTable;