import { Link, useNavigate } from "react-router-dom";
import "./admindashboard.css";

export default function EmployeeLayout({ children }) {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="dashboard-container">

      <div className="sidebar">

        <h2>Employee</h2>
        <hr/>

        <ul>

          <li>
            <Link to="/employee/dashboard">
              Dashboard
            </Link>
          </li>

          <li>
            <Link to="/employee/create-requisition">
              Create Requisition
            </Link>
          </li>

          <li>
            <Link to="/employee/my-requisitions">
              My Requisitions
            </Link>
          </li>

          <li>
            <Link to="/employee/track-status">
              Track Status
            </Link>
          </li>

        </ul>

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>

      </div>

      <div className="main-content">
        {children}
      </div>

    </div>
  );
}