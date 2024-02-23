import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import { router } from "./Routes/allRoutes";
import { RouterProvider } from "react-router-dom";
import { useEffect, useState } from "react";

function App() {

  return (
    <div className="App">
      <ToastContainer />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
