



import { useEffect, useState } from "react";
import API from "../../api/axios";


import { Link, useNavigate } from "react-router-dom";
//import "./master.css";

export default function VendorApproval() {

  const [vendors, setVendors] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [editVendor, setEditVendor] = useState(null);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };
  const loadVendors = async () => {
    const res = await API.get("/vendors");
    setVendors(res.data);
  };

  useEffect(() => {
    loadVendors();
  }, []);

  const approveVendor = async (id) => {
    await API.put(`/vendors/${id}/approve`);
    alert("Vendor Approved Successfully");
    loadVendors();
  };

  const deleteVendor = async (id) => {
    await API.delete(`/vendors/${id}`);
    alert("Vendor Deleted");
    loadVendors();
  };

  const searchVendor = async () => {
    if (!searchId) return loadVendors();

    const res = await API.get(`/vendors/${searchId}`);
    setVendors([res.data]);
  };

  const editClick = (vendor) => {
    setEditVendor(vendor);
  };

  const updateVendor = async () => {
    await API.put(`/vendors/${editVendor.id}`, editVendor);
    alert("Vendor Updated");
    setEditVendor(null);
    loadVendors();
  };

  return (

    <div className="dashboard-container">

      {/* SIDEBAR */}
      <div className="sidebar">
        <h2>Smart Procurement</h2>
        <hr/>

        <ul>
{/*           
          <li><a href="/admin/dashboard">Dashboard</a></li>
          <li><a href="/admin/vendors">Vendor Approval</a></li>
          <li><a href="/admin/items">Items</a></li>
          <li><a href="/admin/Inventory">Inventory</a></li>
          <li><a href="/admin/PurchaseOrder">Purchase Orders</a></li> */}
        </ul>
     
      

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>


      {/* MAIN CONTENT */}
      <div className="main-content">

        <h2>Vendor Approval</h2>

        {/* SEARCH */}
        <div>
          <input
            placeholder="Search Vendor by ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
          <button onClick={searchVendor}>Search</button>
          <button onClick={loadVendors}>Reset</button>
        </div>

        {/* UPDATE FORM */}
        {editVendor && (
          <div className="edit-form">

            <h3>Update Vendor</h3>

            <input
              value={editVendor.companyName}
              onChange={(e) =>
                setEditVendor({ ...editVendor, companyName: e.target.value })
              }
            />

            <input
              value={editVendor.email}
              onChange={(e) =>
                setEditVendor({ ...editVendor, email: e.target.value })
              }
            />

            <button onClick={updateVendor}>Update</button>
            <button onClick={() => setEditVendor(null)}>Cancel</button>

          </div>
        )}

        {/* TABLE */}
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Company</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {vendors.map((v) => (
              <tr key={v.id}>
                <td>{v.id}</td>
                <td>{v.companyName}</td>
                <td>{v.email}</td>
                <td>{v.approved ? "Approved" : "Pending"}</td>

                <td>
                  {!v.approved && (
                    <button onClick={() => approveVendor(v.id)}>
                      Approve
                    </button>
                  )}

                  <button onClick={() => editClick(v)}>
                    Update
                  </button>

                  <button onClick={() => deleteVendor(v.id)}>
                    Delete
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}