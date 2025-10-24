import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditEmployee = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [preview, setPreview] = useState(''); // store preview URL

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

  useEffect(() => {
  return () => {
    if (preview) URL.revokeObjectURL(preview);
  };
}, [preview]);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/employee/${id}`);
        const emp = response.data.formattedResults[0];
        setFormData({
          name: emp.name || "",
          employeeId: emp.employeeId || "",
          department: emp.department || "",
          designation: emp.designation || "",
          project: emp.project || "",
          type: emp.type || "",
          status: emp.status || "",
          image: null,
        });
      } catch (error) {
        console.error("Error fetching employee:", error);
      }
    };
    fetchEmployee();
  }, [id]);

const handleChange = (e) => {
  const { name, value, files } = e.target;
  if (files) {
    setFormData({ ...formData, [name]: files[0] });
    setPreview(URL.createObjectURL(files[0])); // set preview
  } else {
    setFormData({ ...formData, [name]: value });
  }
};
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedForm = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) updatedForm.append(key, formData[key]);
    });

    try {
      const response = await axios.patch(
        `http://localhost:5000/api/employee/${id}`,
        updatedForm,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log("Updated Employee:", response.data.message);
      navigate("/");
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  return (
    <div className="p-6 bg-white max-w-7xl mx-auto mt-0">
      {/* Top Bar */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate("/")}
          className="text-gray-600 hover:text-gray-900"
        >
          <i className="bi bi-chevron-left text-2xl"></i>
        </button>
        <h3 className="text-2xl font-bold text-gray-800 ml-3">
          Edit Employee Details
        </h3>
      </div>


      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Image Upload */}
        <div className="flex justify-start ml-4 mb-6">
         <label
  htmlFor="imageUpload"
  className="cursor-pointer flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-500 transition relative"
>

  
  {/* Preview image */}
  {preview || formData.currentImageURL ? (
    <img
      src={preview || formData.currentImageURL}
      alt="Employee"
      className="w-32 h-32 object-cover rounded-xl absolute top-0 left-0"
    />
  ) : (
    <>
      <i className="bi bi-camera text-3xl text-gray-400"></i>
      <p className="text-gray-500 text-sm mt-2">Upload new image</p>
    </>
  )}

  <input
    type="file"
    id="imageUpload"
    name="image"
    onChange={handleChange}
    hidden
  />
</label>

        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-gray-700 font-semibold mb-1">
              Name
            </label>
            <input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter name"
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label htmlFor="employeeId" className="block text-gray-700 font-semibold mb-1">
              Employee ID
            </label>
            <input
              id="employeeId"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              placeholder="Enter employee ID"
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label htmlFor="department" className="block text-gray-700 font-semibold mb-1">
              Department
            </label>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">Select Department</option>
              <option value="Engineering">Engineering</option>
              <option value="HR">HR</option>
              <option value="Marketing">Marketing</option>
            </select>
          </div>

          <div>
            <label htmlFor="designation" className="block text-gray-700 font-semibold mb-1">
              Designation
            </label>
            <select
              id="designation"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">Select Designation</option>
              <option value="Frontend Developer">Frontend Developer</option>
              <option value="Designer">Designer</option>
              <option value="Manager">Manager</option>
            </select>
          </div>

          <div>
            <label htmlFor="project" className="block text-gray-700 font-semibold mb-1">
              Project
            </label>
            <input
              id="project"
              name="project"
              value={formData.project}
              onChange={handleChange}
              placeholder="Enter project"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label htmlFor="type" className="block text-gray-700 font-semibold mb-1">
              Type
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">Select Type</option>
              <option value="Office">Office</option>
              <option value="Home">Home</option>
            </select>
          </div>

          <div>
            <label htmlFor="status" className="block text-gray-700 font-semibold mb-1">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
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
            className="px-5 py-2 border border-gray-400 rounded-lg text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditEmployee ;
