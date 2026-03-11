


import { Link, useNavigate } from "react-router-dom";
import "./admindashboard.css";

export default function AdminDashboard() {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="dashboard-container">

      {/* Sidebar */}
      <div className="sidebar">
        <h2>Admin Panel</h2>
        <hr />

        <h3>Master</h3>
        <ul>
          <li>
            <Link to="/master/roles">Roles</Link>
          </li>

          <li>
            <Link to="/master/departments">Departments</Link>
          </li>

          <li>
            <Link to="/master/users">Users</Link>
          </li>
        </ul>

        <h3>Procurement</h3>
        <ul>
          <li>
            <Link to="/admin/items">Items</Link>
          </li>

          <li>
            <Link to="/admin/PurchaseOrder">Purchase Order</Link>
          </li>

          <li>
            <Link to="/admin/Inventory">Inventory</Link>
          </li>

          <li>
            <Link to="/admin/VendorApproval">Vendor Request Approval</Link>
          </li>
        </ul>

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <h1>Welcome Admin</h1>
        <p>Select a module from the sidebar.</p>
      </div>

    </div>
  );
}