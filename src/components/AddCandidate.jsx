import axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import { notify } from "../Services/utility";

export const AddCandidate = () => {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [personalEmail, setPersonalEmail] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [designationId, setDesignationId] = useState("");
  const [systemEmailId, setSystemEmailId] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    const data = {
      loginUserId: localStorage.getItem("userId"),
      ipAddress: "will_be_added_later",
      id: 0,
      personalEmail: personalEmail,
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
      departmentId: departmentId,
      sharePointUserId: "nothing",
      designationId: designationId,
      systemEmailId: systemEmailId,
      welcomeEmailSent: 1,
      createDateTimeUtc: new Date().toISOString(),
      lastModifiedDateTimeUtc: new Date().toISOString(),
      createdBy: "AWC_member",
      lastModifiedBy: "AWC_member",
      status: 1,
      approvalRemarks: "Nothing",
      approvalStatus: 0,
      employeeCode: "string",
      wadgesPerDay: 0,
      employmentStartDate: new Date().toISOString(),
      employmentEndDate: new Date().toISOString(),
      employeeType: 0,
    };

    postData(data);
  };

  const postData = async (data) => {
    try {
      const response = await axios.post(
        "https://empployeemanagementapi.azurewebsites.net/create",
        data
      );
      console.log(response);
      if (response.data.status === "SUCCESS") {
        notify("Candidate added", { type: "success" });
      }
      navigate("/home/candidate");
    } catch (error) {
      console.log("Catch block error", error);
    }
  };

  return (
    <>
      <Form>
        <Row className="mb-3">
          <Form.Group as={Col} md="6">
            <Form.Control
              required
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col} md="6">
            <Form.Control
              type="text"
              placeholder="Middle Name"
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6">
            <Form.Control
              required
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col} md="6">
            <InputGroup hasValidation>
              <Form.Control
                type="email"
                placeholder="Personal email"
                value={personalEmail}
                onChange={(e) => setPersonalEmail(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid email.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="departmentId">
            <Form.Control
              required
              type="number"
              placeholder="Department Id"
              value={departmentId}
              onChange={(e) => setDepartmentId(e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="designationId">
            <Form.Control
              required
              type="number"
              placeholder="Designation Id"
              value={designationId}
              onChange={(e) => setDesignationId(e.target.value)}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="systemEmailId">
            <InputGroup hasValidation>
              <Form.Control
                type="email"
                placeholder="System email"
                value={systemEmailId}
                onChange={(e) => setSystemEmailId(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid email.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Row>
        <Row className="mb-3 d-flex justify-content-around align-items-center">
          <Button as={Col} type="submit" md="3" onClick={handleSubmit}>
            Save
          </Button>
          <Button
            as={Col}
            variant="dark"
            md="3"
            onClick={() => navigate("/home/candidate")}
          >
            Close
          </Button>
        </Row>
      </Form>
    </>
  );
};
