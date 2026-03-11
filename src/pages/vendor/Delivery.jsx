import { useState } from "react";
import { createDelivery } from "../../api/vendorService";

export default function Delivery() {

  const [form, setForm] = useState({
    purchaseOrderId: "",
    deliveryDate: "",
    status: "DELIVERED"
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = () => {

    createDelivery(form)
      .then(() => alert("Delivery Submitted"))
      .catch(err => console.error(err));

  };

  return (
    <div>

      <h2>Delivery Tracking</h2>

      <input
        name="purchaseOrderId"
        placeholder="Purchase Order ID"
        onChange={handleChange}
      />

      <input
        type="date"
        name="deliveryDate"
        onChange={handleChange}
      />

      <select name="status" onChange={handleChange}>
        <option value="DELIVERED">DELIVERED</option>
        <option value="IN_TRANSIT">IN TRANSIT</option>
        <option value="PENDING">PENDING</option>
      </select>

      <button onClick={submit}>Submit Delivery</button>

    </div>
  );
}