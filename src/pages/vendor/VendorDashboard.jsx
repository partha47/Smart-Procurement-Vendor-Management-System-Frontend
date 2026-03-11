









import { Link, Outlet, useNavigate } from "react-router-dom";
import "./VendorDashboard.css";

export default function VendorDashboard() {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="dashboard-container">

      {/* Sidebar */}
      <div className="sidebar">

        <h2>Vendor Portal</h2>
        <hr />

        <ul>

          <li>
            <Link to="purchase-orders">
              📦 Purchase Orders
            </Link>
          </li>

          <li>
            <Link to="delivery">
              🚚 Delivery Tracking
            </Link>
          </li>

          <li>
            <Link to="submit-invoice">
              🧾 Submit Invoice
            </Link>
          </li>

          <li>
            <Link to="upload-documents">
              📄 Upload Documents
            </Link>
          </li>

          <li>
            <Link to="ratings">
              ⭐ Vendor Ratings
            </Link>
          </li>

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