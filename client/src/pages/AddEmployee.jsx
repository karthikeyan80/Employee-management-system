import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddEmployee=()=> {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    employeeId: "",
    department: "",
    designation: "",
    project: "",
    type: "",
    status: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await axios.post("http://localhost:5000/api/employee", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Employee added:", response.data);
      navigate("/");
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  return (
    <div className="min-h-screen p-2">
      {/* Top Bar */}
      <div className="flex items-center gap-3 mb-8">
        <i
          className="bi bi-chevron-left text-xl cursor-pointer text-gray-700 hover:text-blue-600"
          onClick={() => navigate("/")}
        ></i>
        <h2 className="text-2xl font-semibold text-gray-800">
          Add New Employee
        </h2>
      </div>

      {/* Section Header */}
      <div className="flex items-center gap-2 mb-6 border-b pb-2">
        <i className="bi bi-person-fill text-blue-500 text-lg"></i>
        <span className="text-blue-400 font-medium underline ">
          Personal Information
        </span>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 max-w-6xl mx-auto"
      >
        {/* Image Upload */}
        <div className="mb-6 flex items-center gap-6">
          {formData.image ? (
            <img
              src={URL.createObjectURL(formData.image)}
              alt="Preview"
              className="w-24 h-24 rounded-full object-cover shadow"
            />
          ) : (
            <label
              htmlFor="imageUpload"
              className="w-24 h-24 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition"
            >
              <i className="bi bi-camera text-gray-400 text-3xl"></i>
              <input
                type="file"
                id="imageUpload"
                name="image"
                onChange={handleChange}
                hidden
              />
            </label>
          )}
          <p className="text-sm text-gray-500">
            Upload a profile image (optional)
          </p>
        </div>

        {/* Input Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {/* Employee ID */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Employee ID <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="employeeId"
              placeholder="Enter Employee ID"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {/* Department */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Department <span className="text-red-500">*</span>
            </label>
            <select
              name="department"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
              required
            >
              <option value="">Select Department</option>
              <option value="Engineering">Engineering</option>
              <option value="HR">HR</option>
              <option value="Marketing">Marketing</option>
            </select>
          </div>

          {/* Designation */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Designation <span className="text-red-500">*</span>
            </label>
            <select
              name="designation"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
              required
            >
              <option value="">Select Designation</option>
              <option value="Developer">Developer</option>
              <option value="Designer">Designer</option>
              <option value="Manager">Manager</option>
            </select>
          </div>

          {/* Project */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Project
            </label>
            <input
              type="text"
              name="project"
              placeholder="Enter Project"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Type */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Type <span className="text-red-500">*</span>
            </label>
            <select
              name="type"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
              required
            >
              <option value="">Select Type</option>
              <option value="Office">Office</option>
              <option value="Home">Home</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Status <span className="text-red-500">*</span>
            </label>
            <select
              name="status"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
              required
            >
              <option value="">Select Status</option>
              <option value="Permanent">Permanent</option>
              <option value="Temporary">Temporary</option>
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-8">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
}


export default AddEmployee;