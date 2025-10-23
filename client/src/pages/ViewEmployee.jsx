import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ViewEmployee = () => {
  const [employee, setEmployee] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/employee/${id}`);
        setEmployee(response.data.formattedResults?.[0] || {});
      } catch (error) {
        console.error("Error fetching employee:", error);
      }
    };
    fetchEmployee();
  }, [id]);

  const infoFields = [
    { label: "Name", value: employee.name },
    { label: "Employee ID", value: employee.employeeId },
    { label: "Department", value: employee.department },
    { label: "Designation", value: employee.designation },
    { label: "Project", value: employee.project },
    { label: "Type", value: employee.type },
    { label: "Status", value: employee.status },
  ];

  return (
    <div className="p-6 bg-white max-w-7xl mx-auto mt-0">
      {/* Top Bar */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate("/")}
          className="text-gray-600 hover:text-blue-600 mr-3 transition"
          title="Back"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h3 className="text-2xl font-semibold text-gray-800">View Employee Details</h3>
      </div>

      {/* Section Title */}
      <div className="flex items-center ml-6 gap-2 mt-4 mb-6 text-2xl underline text-blue-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-blue-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5.121 17.804A3 3 0 017 17h10a3 3 0 012.879 2.804A9.99 9.99 0 0112 22a9.99 9.99 0 01-6.879-4.196zM15 10a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        <span className="font-medium">Personal Information</span>
       
      </div>
       

      {/* Employee Image */}
      <div className="mb-6">
        <img
          src={employee.imageURL || "https://via.placeholder.com/100"}
          alt={employee.name || "Employee"}
          className="w-24 h-24 rounded-lg object-cover border border-gray-200 shadow-sm"
        />
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {infoFields.map((field, index) => (
          <div
            key={index}
            className="border-b border-gray-200 pb-2"
          >
            <label className="text-gray-600 font-semibold block mb-1">
              {field.label}
            </label>
            <p className="text-gray-800 text-base">{field.value || "—"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewEmployee;
