import Sidebar from "./Components/Sidebar";
import Header from "./Components/Header";
import { Route, Routes } from "react-router-dom";
import EmployeeTable from "./Components/EmployeeTable";
import AddEmployee from "./pages/AddEmployee";
import ViewEmployee from "./pages/ViewEmployee";
import EditEmployee from "./pages/EditEmployee";

const App = () => {
  return (
    <div className="flex h-screen overflow-x-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />

        {/* Page content */}
        <div className="flex-1 p-4">
          <Routes>
            <Route path="/" element={<EmployeeTable />} />
            <Route path="/add" element={<AddEmployee />} />
            <Route path="/view/:id" element={<ViewEmployee />} />
            <Route path="/update/:id" element={<EditEmployee />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
