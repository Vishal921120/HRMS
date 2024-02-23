import React, { useEffect } from "react";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import Accordion from "react-bootstrap/Accordion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { SideBar } from "./SideBar";

export const Layout = () => {
  const [isSidebarHidden, setIsSidebarHidden] = useState(true);
  const [menuData, setMenuData] = useState([]);

  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarHidden(!isSidebarHidden);
  };
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const fetchMenu = async () => {
    try {
      const response = await axios.get(
        "https://empployeemanagementapi.azurewebsites.net/api/UserRoleMenuMapping/GetById?userid=96e70289-c682-4983-8637-bff64dc434f8"
      );
      const mData = response.data.data;
      setMenuData(mData);
    } catch (error) {
      console.log("fetch error", error);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  return (
    <>
      <Navbar onToggleSidebar={toggleSidebar} onLogout={handleLogout}/>

      <div className="d-flex flex-row">
        <div
          className={`sidebar ${
            isSidebarHidden ? "" : "sidebar-hidden"
          } p-1 mt-1`}
        >
          <SideBar menuData = {menuData}/>
        </div>
        <div className="m-3" style={{ width: "100vw" , height:"80vh" }}>
          <Outlet />
        </div>
      </div>
    </>
  );
};
