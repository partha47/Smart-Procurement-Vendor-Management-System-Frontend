



import React, { useState } from "react";
import API from "../../api/axios";
import "./ProcessPayment.css";

export default function ProcessPayment() {

  const [invoiceId, setInvoiceId] = useState("");
  const [paidAmount, setPaidAmount] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await API.post("/payment", {
        invoiceId: invoiceId,
        paidAmount: paidAmount,
        paymentDate: paymentDate,
        paymentMode: paymentMode,
        status: status
      });

      alert("Payment Processed Successfully");

      setInvoiceId("");
      setPaidAmount("");
      setPaymentDate("");
      setPaymentMode("");
      setStatus("");

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="payment-container">

      <h2 className="payment-title">Process Payment</h2>

      <form className="payment-form" onSubmit={handleSubmit}>

        <div className="form-group">
          <label>Invoice ID</label>
          <input
            type="number"
            value={invoiceId}
            onChange={(e) => setInvoiceId(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Paid Amount</label>
          <input
            type="number"
            value={paidAmount}
            onChange={(e) => setPaidAmount(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Payment Date</label>
          <input
            type="date"
            value={paymentDate}
            onChange={(e) => setPaymentDate(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Payment Mode</label>
          <select
            value={paymentMode}
            onChange={(e) => setPaymentMode(e.target.value)}
            required
          >
            <option value="">Select Mode</option>
            <option value="Cash_TRANSFER">Cash Transfer</option>
            <option value="BANK_TRANSFER">Bank Transfer</option>
            <option value="UPI">UPI</option>
          </select>
        </div>

        <div className="form-group">
          <label>Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="">Select Status</option>
            <option value="COMPLETED">Completed</option>
            <option value="PENDING">Pending</option>
          </select>
        </div>

        <button className="payment-btn" type="submit">
          Process Payment
        </button>

      </form>

    </div>
  );
}