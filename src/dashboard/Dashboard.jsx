import DashNavBar from "./components/DashNavBar";
import DashSideBar from "./components/DashSideBar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <DashNavBar />
      <div className="flex ">
        <DashSideBar />
        <div className="flex-grow border  p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
