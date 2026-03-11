







import { useState } from "react";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";   //  Import CSS file

export default function Login() {
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      if (!email.trim() || !password.trim()) {
        alert("Please enter both username and password");
        return;
      }

      const res = await API.post("/users/auth/login", {
        email: email.trim(),
        password: password.trim(),
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      const role = res.data.role?.toUpperCase();

      if (role === "EMPLOYEE") navigate("/employee");
      else if (role === "MANAGER") navigate("/manager");
      else if (role === "ADMIN") navigate("/admin");
      else if (role === "FINANCE") navigate("/finance");
      else if (role === "VENDOR") navigate("/vendor");
      else alert("Role not configured: " + role);

    } catch (error) {
      alert("Login Failed. Please check credentials.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Smart Procurement System</h2>

        <input
          type="text"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setUsername(e.target.value)}
          className="login-input"
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />

        <button onClick={login} className="login-button">
          Login
        </button>

        <p className="vendor-text">
          Are you a Vendor?{" "}
          <Link to="/pages/vendor-register/VendorRegister" className="vendor-link">
            Register Here
          </Link>
        </p>
      </div>
    </div>
  );
}

