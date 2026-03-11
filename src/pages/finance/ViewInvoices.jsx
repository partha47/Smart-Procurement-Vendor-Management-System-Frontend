




import React, { useEffect, useState } from "react";
import API from "../../api/axios";
import "./PaymentStyles.css";

export default function ViewInvoices() {

  const [invoices, setInvoices] = useState([]);
  const [invoiceId, setInvoiceId] = useState("");

  const [poId, setPoId] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {

    try {
      const res = await API.get("/invoice");
      setInvoices(res.data);
    } catch (err) {
      console.error(err);
    }

  };

  const searchInvoice = async () => {

    try {

      const res = await API.get(`/invoice/${invoiceId}`);

      setInvoices([res.data]);

    } catch (err) {
      console.error(err);
      alert("Invoice not found");
    }

  };

  const createInvoice = async () => {

    try {

      const res = await API.post("/invoice", {

        purchaseOrder: {
          id: Number(poId)
        },

        invoiceNumber: invoiceNumber,
        amount: Number(amount)

      });

      alert("Invoice Created");

      fetchInvoices();

    } catch (err) {
      console.error(err);
    }

  };

  const processPayment = async (invoiceId, amount) => {

    try {

      await API.post("/payment", {
        invoiceId: invoiceId,
        paidAmount: amount,
        paymentDate: new Date().toISOString().split("T")[0],
        paymentMode: "BANK_TRANSFER",
        status: "PAID"
      });

      alert("Payment Successful");

    } catch (err) {
      console.error(err);
    }

  };

  return (

    <div className="page-container">

      <h2 className="page-title">Invoices</h2>

      {/* SEARCH INVOICE */}
      <div className="search-box">

        <input
          placeholder="Invoice ID"
          value={invoiceId}
          onChange={(e) => setInvoiceId(e.target.value)}
        />

        <button onClick={searchInvoice}>
          Search Invoice
        </button>

      </div>

      <table className="data-table">

        <thead>
          <tr>
            <th>Invoice Number</th>
            <th>Vendor</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {invoices.map(inv => (

            <tr key={inv.id}>

              <td>{inv.invoiceNumber}</td>

              <td>
                {inv.purchaseOrder?.vendor?.companyName}
              </td>

              <td>{inv.amount}</td>

              <td>

                <button
                  className="action-btn"
                  onClick={() =>
                    processPayment(inv.id, inv.amount)
                  }
                >
                  Pay
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );
}