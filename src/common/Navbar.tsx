import React from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

export const Navbar = () => {
  let navigate = useNavigate();

  return (
    <div className="navbar1">
      <nav className="navbar navbar-expand-lg ">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Admin Panel
          </a>
          <a
            className="logout"
            href="#"
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
          >
            Logout
          </a>
        </div>
      </nav>
    </div>
  );
};
