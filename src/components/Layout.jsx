import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa";
import Accordion from "react-bootstrap/Accordion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

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
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Button variant="primary" onClick={toggleSidebar}>
            <GiHamburgerMenu />
          </Button>
          <Navbar.Brand href="#home">AWC</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Button onClick={handleLogout}>
              <FaUserCircle /> Logout
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
      <div className="d-flex flex-row">
      <div
        className={`sidebar ${
          isSidebarHidden ? "" : "sidebar-hidden"
        } p-1 mt-1`}
      >
        <Accordion>
          {menuData.length !== 0
            ? menuData.map((item, index) => (
                <Accordion.Item eventKey={index}>
                  <Accordion.Header>
                    <b>{item.pageURL}</b>
                  </Accordion.Header>
                  <Accordion.Body
                    className="d-flex justify-content-center align-items-center"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/home/${item.pageURL}`)}
                  >
                    <GiHamburgerMenu className="m-1" />
                    {item.menu}
                  </Accordion.Body>
                </Accordion.Item>
              ))
            : ""}
        </Accordion>
      </div>
      <Outlet />
      </div>
    </>
  );
};
