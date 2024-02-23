import { Login } from "../components/Login";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { Home } from "../components/Home";
import { Layout } from "../components/Layout";
import { Candidate } from "../components/Candidate";
import { AddCandidate } from "../components/AddCandidate";

export const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/login" replace /> },
  { path: "/login", element: <Login /> },
  {
    path: "/home",
    element: <Layout />,
    children: [
      { path: "Candidate", element: <Candidate /> },
      { path: "Candidate/add", element: <AddCandidate /> },
      { path: "Candidate/edit", element: <AddCandidate /> },
      { path: "Candidate/home", element: <Home /> },
    ],
  },
]);
