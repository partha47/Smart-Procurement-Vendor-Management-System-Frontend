import { useState } from "react";
//import axios from "../api/axios";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function VendorRegister() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    vendorName: "",
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    gstNumber: "",
    address: ""
  });

  const registerVendor = async () => {
    try {
      await axios.post("/vendors", form);
      alert("Vendor Registered Successfully. Wait for approval.");
      navigate("/login");
      
    } catch (error) {
      alert("Registration Failed");
    }
  };

  return (
    <div style={{ width: "400px", margin: "50px auto" }}>
      <h2>Vendor Registration</h2>

      <input placeholder="Vendor Name"
        onChange={e => setForm({...form, vendorName: e.target.value})} />

      <input placeholder="Company Name"
        onChange={e => setForm({...form, companyName: e.target.value})} />

      <input placeholder="Contact Person"
        onChange={e => setForm({...form, contactPerson: e.target.value})} />

      <input placeholder="Email"
        onChange={e => setForm({...form, email: e.target.value})} />

      <input placeholder="Phone"
        onChange={e => setForm({...form, phone: e.target.value})} />

      <input placeholder="GST Number"
        onChange={e => setForm({...form, gstNumber: e.target.value})} />

      <input placeholder="Address"
        onChange={e => setForm({...form, address: e.target.value})} />

      <button onClick={registerVendor}>
        Register
      </button>
    </div>
  );
}