import group from "../assets/group.png";

const Employee = () => {
  return (
    <div className="flex flex-row opacity-50 justify-items-center space-x-2 bg-blue-600 text-white py-2 rounded-full w-45">
      <img src={group} className="w-6 h-6 ml-2" alt="Employee" />
      <p className="font-medium">Employee</p>
    </div>
  );
};

export default Employee;
