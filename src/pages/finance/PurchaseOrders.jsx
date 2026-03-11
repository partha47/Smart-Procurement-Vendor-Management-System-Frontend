import React, { useEffect, useState } from "react";
import API from "../../api/axios";
import "./PaymentStyles.css";

export default function PurchaseOrders() {

  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [poId, setPoId] = useState("");

  useEffect(() => {
    fetchPOs();
  }, []);

  const fetchPOs = async () => {

    try {

      const res = await API.get("/po");

      setPurchaseOrders(res.data);

    } catch (err) {
      console.error(err);
    }

  };

  const searchPO = async () => {

    try {

      const res = await API.get(`/po/${poId}`);

      setPurchaseOrders([res.data]);

    } catch (err) {
      console.error(err);
      alert("Purchase Order not found");
    }

  };

  return (

    <div className="page-container">

      <h2 className="page-title">Purchase Orders</h2>

      {/* SEARCH PURCHASE ORDER */}
      <div className="search-box">

        <input
          placeholder="Search PO ID"
          value={poId}
          onChange={(e) => setPoId(e.target.value)}
        />

        <button onClick={searchPO}>
          Search
        </button>

        <button
          className="action-btn"
          style={{ marginLeft: "10px" }}
          onClick={fetchPOs}
        >
          View All
        </button>

      </div>

      <table className="data-table">

        <thead>

          <tr>
            <th>PO Number</th>
            <th>Order Date</th>
            <th>Status</th>
            <th>Vendor Email</th>
          </tr>

        </thead>

        <tbody>

          {purchaseOrders.map(po => (

            <tr key={po.id}>

              <td>{po.poNumber}</td>

              <td>{po.orderDate}</td>

              <td>{po.status}</td>

              <td>{po.vendor?.email}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );
}