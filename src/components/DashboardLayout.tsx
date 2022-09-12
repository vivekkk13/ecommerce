import React from "react";
import { Navbar } from "../common/Navbar";
import { Sidebar } from "../common/Sidebar";

interface IProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: IProps) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-2 px-0">
          <Sidebar />
        </div>
        <div className="col-lg-10 custom_scroll px-0">
          <Navbar />
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
