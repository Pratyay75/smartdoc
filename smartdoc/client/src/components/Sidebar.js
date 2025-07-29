import React, { useState } from "react";
import "./Sidebar.css";
import { FiMenu, FiFileText, FiBarChart2, FiHome } from "react-icons/fi";

function Sidebar({ onNavigate,}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="sidebar-container">
      <button className="menu-btn" onClick={() => setOpen(!open)}>
        <FiMenu size={24} />
      </button>

      {open && (
        <div className="sidebar">
          <div className="sidebar-option" onClick={() => onNavigate("home")}>
            <FiHome /> <span>Home</span>
          </div>

          <div className="sidebar-option" onClick={() => onNavigate("pdf")}>
            <FiFileText /> <span>PDF Extractor</span>
          </div>

          <div className="sidebar-option" onClick={() => onNavigate("analytics")}>
            <FiBarChart2 /> <span>Data Analytics</span>
          </div>

          
        </div>
      )}
    </div>
  );
}

export default Sidebar;
