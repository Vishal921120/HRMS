import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Pagination from "react-bootstrap/Pagination";
import { notify } from "../utility";
import Dropdown from 'react-bootstrap/Dropdown';
import { PopUp } from "./PopUp";
import axios from "axios";

export const Candidate = () => {
  const [candidate, setCandidate] = useState([]);
  const [popUp, setPop] = useState(false);
  const [activePage, setActivePage] = useState(1); 
  const itemsPerPage = 100;

  const fetchCandidate = async () => {
    try {
      const response = await axios.get(
        "https://empployeemanagementapi.azurewebsites.net/api/Candidate/GetAll"
      );

      console.log(response);

      const data = response.data.data;
      setCandidate(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCandidate();
  }, []);

  const handleDelete = (id) => {};

  const handleSubmit = (candidate) => {};

  const handleAdd = () => {
    setPop(true);
  };

  const handleClose = () => {
    setPop(false);
  };

  const indexOfLastItem = activePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = candidate.slice(indexOfFirstItem, indexOfLastItem);

  if (activePage > 1 && currentItems.length < 1) {
    setActivePage((prev) => prev - 1);
  }

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  console.log(candidate);

  return (
    <div
      className="d-flex justify-content-center align-item-center flex-column"
      style={{ width: "100%", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
    >
      <Table hover>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Remarks</th>
            <th>Status</th>
            <th className="d-flex justify-content-center">
              <Button>
                {" "}
                <b>+</b> Add
              </Button>
            </th>
          </tr>
        </thead>
        <tbody>
          {currentItems && currentItems.length !== 0 ? (
            currentItems.map((candidate) => (
              <tr key={candidate.id}>
                <td>{candidate.firstName}</td>
                <td>{candidate.lastName}</td>
                <td>{candidate.personalEmailId}</td>
                <td>{candidate.approvalRemarks}</td>
                <td>
                  {candidate.approvalStatus === 2 ? "Approved" : "Pending"}
                </td>
                <td className="d-flex justify-content-center">
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      <FontAwesomeIcon icon={faBars} size="sm"/>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item href="#/action-1" style={{color:"red"}}><b>Delete</b></Dropdown.Item>
                      <Dropdown.Item href="#/action-2" style={{color:"green"}}>
                      <b>Approve</b>
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-2" style={{color:"blue"}}>
                      <b>Edit</b>
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-3" style={{color:"red"}}>
                      <b>Reject</b>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td>No data</td>
              <td>No data</td>
              <td>No data</td>
              <td>No data</td>
            </tr>
          )}
        </tbody>
      </Table>

      <PopUp show={popUp} close={handleClose} onSubmit={handleSubmit} />
      <Pagination>
        {Array.from(
          { length: Math.ceil(candidate.length / itemsPerPage) },
          (_, i) => (
            <Pagination.Item
              key={i + 1}
              active={i + 1 === activePage}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </Pagination.Item>
          )
        )}
      </Pagination>
    </div>
  );
};
