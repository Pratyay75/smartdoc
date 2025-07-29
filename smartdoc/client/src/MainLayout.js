import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import PDFExtractor from "./components/PDFExtractor";
import Analytics from "./components/Analytics";
import "./App.css";

function MainLayout({ onLogout }) {
  const [activePage, setActivePage] = useState("home");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("name");
    setUserName(name || "User");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    onLogout(); // Redirects to login page
  };

  return (
    <div className="layout">
      <Sidebar onNavigate={setActivePage} onLogout={handleLogout} />
      <div className="main-content">
        <Header onLogout={handleLogout} />
        <div className="page-content">
          {activePage === "home" && (
            <div className="home-description">
              <h2>Welcome, {userName}!</h2>
              <p>
                Upload insurance contracts and automatically extract key fields like name, contract amount, issue date, and exclusions.
              </p>
            </div>
          )}
          {activePage === "pdf" && <PDFExtractor />}
          {activePage === "analytics" && <Analytics />}
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
