import dashboard from "../assets/dashboard.png";
const Dashboard = () => {
  return (
    <div className="flex flow-row opacity-50 space-x-1 items-center">
      <img src={dashboard} className="h-6 w-6" />
      <p>Dashboard</p>
    </div>
  );
};

export default Dashboard;
