import React from "react";
import DashboardCard from "../components/DashboardCard";
import "../styles/Home.css";
import { useState } from "react";

const Home = () => {
  const [stats] = useState({
    products : 120,
    orders : 56,
    users : 30,
    categories :8
  })

  return (
    <div>
      <h1>Dashboard</h1>
      <div className="dashboard-grid">
        <DashboardCard title="Products" value={stats.products} />
        <DashboardCard title="Orders" value={stats.orders} />
        <DashboardCard title="Users" value={stats.users} />
        <DashboardCard title="Categories" value={stats.categories} />
      </div>
    </div>
  );
};

export default Home;
