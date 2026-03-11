







import { useEffect, useState } from "react";
import { Link, Outlet ,useNavigate} from "react-router-dom";
import api from "../../api/axios";

import "./managerdashboard.css";

export default function ManagerDashboard() {

  const [requisitions, setRequisitions] = useState([]);
  const [approvals, setApprovals] = useState([]);
  const [orders, setOrders] = useState([]);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };
  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {

      const req = await api.get("/requisitions");
      const app = await api.get("/approvals");
      const po = await api.get("/po");

      setRequisitions(req.data);
      setApprovals(app.data);
      setOrders(po.data);

    } catch (err) {
      console.error("Dashboard Load Error:", err);
    }
  };

  // counts
  const pendingCount = requisitions.filter(
    r => r.status === "PENDING"
  ).length;

  const approvedCount = approvals.filter(
    a => a.status === "APPROVED"
  ).length;

  const poCount = orders.length;

  return (
    <div className="dashboard-container">

      {/* Sidebar */}
      <div className="sidebar">
        <h2>Manager</h2>
        <hr />

        <ul>
          <li><Link to="/manager">Dashboard</Link></li>
          <li><Link to="/manager/pending">Pending Approvals</Link></li>
          <li><Link to="/manager/approved">Approved Requests</Link></li>
        </ul>
 <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="main-content">

        <h2>Manager Dashboard</h2>

        <div className="card-grid">

          <div className="card">
            <h3>Pending Approvals</h3>
            <p>{pendingCount}</p>
          </div>

          <div className="card">
            <h3>Approved Requests</h3>
            <p>{approvedCount}</p>
          </div>

          <div className="card">
            <h3>Purchase Orders</h3>
            <p>{poCount}</p>
          </div>

        </div>

        <Outlet />

      </div>
    </div>
  );
}