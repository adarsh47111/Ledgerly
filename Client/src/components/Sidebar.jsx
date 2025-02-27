import { useState } from "react";
import {
  BarChart,
  FileText,
  Users,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`flex flex-col ${
        !isOpen ? "items-center" : ""
      } justify-between h-screen bg-gray-900 text-white`}
    >
      {/* Sidebar */}
      <div
        className={`bg-gray-900 text-white h-screen p-5 transition-all duration-300 ${
          isOpen ? "w-60" : "w-16"
        }`}
      >
        {/* Toggle Header (Dashboard + Arrow) */}
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={toggleSidebar}
        >
          <h1
            className={`text-lg font-semibold transition-all ${
              isOpen ? "opacity-100" : "opacity-0 hidden"
            }`}
          >
            Dashboard
          </h1>
          <button className="text-gray-400 hover:text-white">
            {isOpen ? <ChevronLeft /> : <ChevronRight />}
          </button>
        </div>

        {/* Menu Items */}
        <ul className="mt-6 space-y-4">
          <SidebarItem
            icon={<BarChart />}
            text="Analytics"
            isOpen={isOpen}
            route="analytic"
          />
          <SidebarItem
            icon={<FileText />}
            text="Invoices"
            isOpen={isOpen}
            route="invoice"
          />
          <SidebarItem
            icon={<Users />}
            text="Customers"
            isOpen={isOpen}
            route="customer"
          />
        </ul>
      </div>

      {/* Footer */}
      <div
        className={`flex items-center gap-3 ${
          isOpen ? "pl-6" : ""
        } my-4 rounded-md hover:bg-gray-800 cursor-pointer`}
      >
        <LogOut />
        <span
          className={`transition-all ${
            isOpen ? "opacity-100" : "opacity-0 hidden"
          }`}
        >
          Logout
        </span>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, text, isOpen, route }) => {
  return (
    <li>
      <NavLink
        to={route}
        className="flex items-center gap-3 p-1 rounded-md hover:bg-gray-800 cursor-pointer"
      >
        {icon}
        <span
          className={`transition-all ${
            isOpen ? "opacity-100" : "opacity-0 hidden"
          }`}
        >
          {text}
        </span>
      </NavLink>
    </li>
  );
};

export default Sidebar;
