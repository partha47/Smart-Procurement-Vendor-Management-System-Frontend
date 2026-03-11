







import React, { useEffect, useState } from "react";
import API from "../../api/axios";
import "./PaymentStyles.css";

export default function ViewPayments() {

  const [payments, setPayments] = useState([]);
  const [paymentId, setPaymentId] = useState("");

  useEffect(() => {

    API.get("/payment")
      .then(res => setPayments(res.data))
      .catch(err => console.error(err));

  }, []);

  const searchPayment = async () => {

    try {

      const res = await API.get(`/payment/${paymentId}`);

      setPayments([res.data]);

    } catch (err) {
      console.error(err);
      alert("Payment not found");
    }

  };

  return (

    <div className="page-container">

      <h2 className="page-title">Payment History</h2>

      {/* GET BY ID */}
      <div className="search-box">

        <input
          placeholder="Search Payment ID"
          value={paymentId}
          onChange={(e) => setPaymentId(e.target.value)}
        />

        <button onClick={searchPayment}>
          Search
        </button>

      </div>

      <table className="data-table">

        <thead>

          <tr>
            <th>Invoice</th>
            <th>Vendor</th>
            <th>Paid Amount</th>
            <th>Date</th>
            <th>Status</th>
          </tr>

        </thead>

        <tbody>

          {payments.map(pay => (

            <tr key={pay.id}>

              <td>
                {pay.invoice?.invoiceNumber}
              </td>

              <td>
                {pay.invoice?.purchaseOrder?.vendor?.companyName}
              </td>

              <td>{pay.paidAmount}</td>

              <td>{pay.paymentDate}</td>

              <td>{pay.status}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );
}