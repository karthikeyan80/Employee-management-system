import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from "./modals/Modal";
import search from "../assets/search.png"

const EmployeeTable = () => {
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
          <div className="relative w-full md:w-64">
  <img
    src={search}
    alt="Search"
    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
  />
  <input
    type="search"
    placeholder="Search Employee"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
  />
</div>

          <button
            onClick={() => navigate("/add")}
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            <span className="ml-2">Add New</span>
          </button>
        </div>
      </div>

      {/* Employee Table */}
      <div className="mt-8 overflow-x-auto bg-white rounded-sm border border-gray-400">
        <table className="w-full text-left border-collapse">
          <thead className="border-b border-gray-400">
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
                <tr key={index} className="border-b border-gray-400 hover:bg-gray-50 transition">
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
                  <td className="px-4 py-3 w-32">
                    <div className="flex items-center justify-center gap-2">
                      {/* View Button */}
                      <button
                        onClick={() => navigate(`/view/${emp.employeeId}`)}
                        className="text-gray-400 hover:text-blue-700"
                        title="View"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </button>

                      {/* Edit Button */}
                      <button
                        onClick={() => navigate(`/update/${emp.employeeId}`)}
                        className="text-gray-400 hover:text-green-700"
                        title="Edit"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11 4h2m2 0h2m2 0h2M5 20h14a2 2 0 002-2V8l-6-6H5a2 2 0 00-2 2v14a2 2 0 002 2z"
                          />
                        </svg>
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() => {
                          setDeleteId(emp.employeeId);
                          setModalOpen(true);
                        }}
                        className="text-gray-400 hover:text-red-700"
                        title="Delete"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4a1 1 0 011 1v1H9V4a1 1 0 011-1zm-3 4h10"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center text-gray-500 py-6 text-sm">
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 h-10 text-red-500 mb-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4a1 1 0 011 1v1H9V4a1 1 0 011-1zm-3 4h10"
            />
          </svg>
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
};

export default EmployeeTable;
