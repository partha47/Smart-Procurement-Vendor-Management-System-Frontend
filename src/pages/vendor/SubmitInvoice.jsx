
import { useState } from "react";
import { submitInvoice } from "../../api/vendorService";

export default function SubmitInvoice() {

  const [form, setForm] = useState({
    poId: "",
    invoiceNumber: "",
    amount: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {

    submitInvoice({
      purchaseOrder: { id: form.poId },
      invoiceNumber: form.invoiceNumber,
      amount: form.amount
    })
      .then(() => alert("Invoice Submitted"))
      .catch(err => console.error(err));
  };

  return (
    <div>

      <h3>Submit Invoice</h3>

      <input
        name="poId"
        placeholder="Purchase Order ID"
        onChange={handleChange}
      />

      <input
        name="invoiceNumber"
        placeholder="Invoice Number"
        onChange={handleChange}
      />

      <input
        name="amount"
        placeholder="Amount"
        onChange={handleChange}
      />

      <button onClick={handleSubmit}>
        Submit
      </button>

    </div>
  );
}