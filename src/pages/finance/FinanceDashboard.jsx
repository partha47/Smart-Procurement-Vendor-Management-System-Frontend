


import { Link, Outlet, useNavigate } from "react-router-dom";
import "./Dashboard.css";

export default function FinanceDashboard() {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="dashboard-container">

      {/* Sidebar */}
      <div className="sidebar">
        <h2>Finance Panel</h2>
        <hr />

        <ul>
          <li>
            <Link to="invoices">View Invoices</Link>
          </li>

          <li>
            <Link to="payments">Payment History</Link>
          </li>

          <li>
            <Link to="process-payment">Process Payment</Link>
          </li>
 <li>
            <Link to="purchase-orders">PurchaseOrders</Link>
          </li>



            <li><Link to="reports">Reports</Link></li>
        </ul>

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <Outlet />
      </div>

    </div>
  );
}