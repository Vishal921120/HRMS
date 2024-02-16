import React, { useState } from "react";
import axios from "axios";
import { notify } from "../utility";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!userName || !password) {
      notify("Username and password are required.", { type: "warning" });
      return;
    }

    let userInfo = {
      userName: userName,
      password: password,
    };

    try {
      const response = await axios.post(
        "https://empployeemanagementapi.azurewebsites.net/api/Authenticate/login",
        userInfo
      );
      console.log(response);

      if (response.status === 200) {
        notify("Login Successful", { type: "success" });
        localStorage.setItem("userId", response.data.userid);
        navigate("/home");
      } else {
        notify("Login failed", { type: "error" });
      }
    } catch (error) {
      console.error("Error:", error);
      notify("Username or Password is incorrect", { type: "error" });
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        width: "100vw",
        height: "100vh",
        background: "rgb(2,0,36)",
        background:
          "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(114,9,121,1) 35%, rgba(0,212,255,1) 100%)",
      }}
    >
      <div className="login-container">
        <h2>Login</h2>
        <div className="d-flex justify-content-center align-items-center">
          <FaUser/>
          <input
            className="m-2"
            type="text"
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            placeholder="Enter username"
          />
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <RiLockPasswordFill />
          <input
            className="m-2"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Enter password"
          />
        </div>

        <button className="loginBtn mt-3" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};
