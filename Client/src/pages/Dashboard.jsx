import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  return (
    <div className="flex">
      <div className="">
        <Sidebar />
      </div>
      <Outlet />
    </div>
  );
};

export default Dashboard;
