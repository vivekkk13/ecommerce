import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Login } from "./components/Login";
import { HashRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import User from "./components/User";
import { Products } from "./components/Products";

function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/User" element={<User />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
