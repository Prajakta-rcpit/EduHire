import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get(`${process.env.REACT_APP_BACKEND_URL}/logout`, { withCredentials: true });
      toast.success("Logout Successful");
      navigate("/");
    } catch (error) {
      console.log("Logout Failed", error.message);
      toast.error("Logout Failed", error.message);
    }
  };

  const menuItems = [
    { icon: "📊", name: "Dashboard", path: "/viewvacancies" },
   
    { icon: "⚙️", name: "About Us", path: "/aboutus" },
  ];


  return (
    <>
      <button
        className="fixed z-50 top-4 left-4 p-2 bg-[#A594F9] text-white rounded-md md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "✕" : "☰"}
      </button>
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 bg-[#E5D9F2] text-[#4A0E5C] p-4 overflow-y-auto`}
      >
        <div className="flex items-center justify-center mb-8">
          <h1 className="text-2xl font-bold text-[#4A0E5C]">EduHire</h1>
        </div>
        <nav>
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <a
                  href={item.path}
                  className="flex items-center p-2 rounded-lg hover:bg-[#CDC1FF] transition-colors duration-200"
                >
                  <span className="mr-3 text-xl">{item.icon}</span>
                  <span>{item.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <button
          onClick={handleLogout}
          className="absolute bottom-4 left-4 right-4 flex items-center justify-center p-2 bg-[#A594F9] text-white rounded-lg hover:bg-[#8B6BF2] transition-colors duration-200"
        >
          <span className="mr-2">🚪</span>
          Logout
        </button>
      </aside>
    </>
  );
};

export default Sidebar;