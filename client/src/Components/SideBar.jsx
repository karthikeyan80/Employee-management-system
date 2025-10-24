
import Dashboard from "./Dashboard";
import Employee from "./Employee";
import Calendar from "./Calendar";
import Messages from "./Messages";

const Sidebar = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="flex flex-col w-60 space-y-4 font-medium relative">
        <div className="px-8 py-8">
          <p className="text-2xl font-bold text-blue-600 ml-6">RS - TECH</p>
        </div>
        <hr className="text-gray-400 min-w-screen" />
        <div className="mt-8 font-black space-y-8 ml-8">
          <Dashboard />
          <Employee />
          <Calendar />
          <Messages />
        </div>

        {/* Vertical line next to sidebar */}
        <div className="absolute top-0 right-0 h-[120vh] w-0.5 bg-gray-300"></div>
      </div>

      {/* Main content placeholder */}
      <div className="flex-1">
        {/* Your main content goes here */}
      </div>
    </div>
  );
};

export default Sidebar;
