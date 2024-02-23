import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useNavigate } from "react-router-dom";
import {GiHamburgerMenu} from "react-icons/gi";

export const SideBar = ({ menuData }) => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = React.useState("");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <>
      {menuData.length !== 0
        ? menuData.map((item, index) => (
            <Accordion key={index} expanded={expanded === `${index}`} onChange={handleChange(`${index}`)}>
                <AccordionSummary
                  expandIcon={<ArrowDownwardIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Typography><b>{item.pageURL}</b></Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography
                    className="d-flex justify-content-center align-items-center"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/home/${item.pageURL}`)}
                  >
                    <GiHamburgerMenu className="m-1" />
                    {item.menu}
                  </Typography>
                </AccordionDetails>
            </Accordion>
          ))
        : " "}
    </>
  );
};
