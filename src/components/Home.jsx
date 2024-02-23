import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCandidate, deleteCandidate } from "../Services/Api";
import { notify } from "../Services/utility";
import { RiLockPasswordFill } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import { Button, colors } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export const Home = () => {
  const [candidate, setCandidate] = useState([]);
  const navigate = useNavigate();

  const getCandidateData = async () => {
    const data = await fetchCandidate();
    data.filter((item) => item.id !== 0);
    setCandidate(data);
  };

  useEffect(() => {
    getCandidateData();
  }, []);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  
  const handleClick = (event) => {
    console.log(event);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async (id) => {
    deleteCandidate(id);
    setCandidate((prev) => prev.filter((item) => item.id !== id));
    notify("Candidate Deleted", { type: "success" });
  };

  const columns = [
    { field: "firstName", headerName: "First name", width: 200 },
    { field: "lastName", headerName: "Last name", width: 150 },
    {
      field: "email",
      headerName: "Email",
      type: "email",
      headerClassName: "super-app-theme--header",
      width: 250,
    },
    { field: "remarks", headerName: "Remarks", width: 150 },
    { field: "status", headerName: "Status", width: 150 },
    {
      field: "actions",
      type: "actions",
      width: 130,
      getActions: (params) => [
        <>
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <GiHamburgerMenu />
          </Button>
          {params.status === "Approved" ? (
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>Reject</MenuItem>
              <MenuItem onClick={handleClose}>Edit</MenuItem>{" "}
            </Menu>
          ) : (
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>Delete</MenuItem>
              <MenuItem onClick={handleClose}>Approve</MenuItem>
              <MenuItem onClick={handleClose}>Reject</MenuItem>
              <MenuItem onClick={handleClose}>Edit</MenuItem>
            </Menu>
          )}
        </>,
      ],
    },
  ];

  let rows = candidate.map((item, index) => ({
    id: item.id,
    key: item.id,
    firstName: item.firstName,
    lastName: item.lastName,
    email: item.personalEmailId,
    remarks: item.approvalRemarks,
    status: item.approvalStatus === 2 ? "Approved" : "Pending",
  }));

  if (rows.length === 0) {
    rows = [
      {
        id: 0,
        key: 0,
        firstName: "no data",
        lastName: "no data",
        email: "no data",
        remarks: "no data",
        status: "no data",
      },
    ];
  }

  return (
    <>
      <h1>Candidate Onboarding</h1>
      <div
        style={{
          height: "90%",
          width: "100%",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          border: "20px",
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10, 50, 100]}
        />
      </div>
    </>
  );
};
