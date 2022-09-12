import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getNumberOfusers,
  getNumberOfProductslist,
} from "../services/ApiCalls";
import DashboardLayout from "./DashboardLayout";

export default function Dashboard() {
  const [numberOfUsers, setNumberOfUsers] = useState([]);
  const [numbersOfroducts, setNumberOfProducts] = useState([]);
  let navigate = useNavigate();

  const getNumberOFUsers: any = async () => {
    let ans = await getNumberOfusers();
    setNumberOfUsers(ans?.data.users);
  };
  const getNumberOfProducts = async () => {
    let res = await getNumberOfProductslist();
    setNumberOfProducts(res?.data.products);
  };

  useEffect(() => {
    getNumberOFUsers();
    getNumberOfProducts();
    const name = localStorage.getItem("token");
    if (!name) {
      navigate("/");
    } else {
      navigate("/dashboard");
    }
  }, []);

  return (
    <DashboardLayout>
      <>
        <div className="my-5 px-3">
          <h1>Dashboard</h1>
          <div className="card1">
            <div className="card">
              <div className="card-body cardbady">
                <h5 className="card-title">Total Users</h5>

                <p className="card-text">{numberOfUsers.length}</p>
              </div>
            </div>
          </div>

          <div className="card2">
            <div className="card">
              <div className="card-body cardbady">
                <h5 className="card-title">Total products</h5>

                <p className="card-text"> {numbersOfroducts.length}</p>
              </div>
            </div>
          </div>
        </div>
      </>
    </DashboardLayout>
  );
}
