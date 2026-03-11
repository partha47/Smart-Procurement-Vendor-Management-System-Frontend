


import { useState } from "react";
import api from "../../api/axios";
import EmployeeLayout from "./EmployeeLayout";

export default function CreateRequisition() {

  const [form, setForm] = useState({
    userId: 1,
    itemId: "",
    quantity: "",
    reason: ""
  });

  const submit = async () => {

    try {

      const payload = {
        userId: Number(form.userId),
        itemId: Number(form.itemId),
        quantity: Number(form.quantity),
        reason: form.reason,
        item: {
          id: Number(form.itemId)
        }
      };

      const res = await api.post("/requisitions", payload);

      console.log(res.data);

      alert("Requisition Created Successfully");

      setForm({
        userId: 1,
        itemId: "",
        quantity: "",
        reason: ""
      });

    } catch (err) {
      console.error(err);
      alert("Error creating requisition");
    }
  };

  return (

    <EmployeeLayout>

      <h2>Create Requisition</h2>

      <input
        type="number"
        placeholder="Item Id"
        value={form.itemId}
        onChange={e => setForm({ ...form, itemId: e.target.value })}
      />

      <input
        type="number"
        placeholder="Quantity"
        value={form.quantity}
        onChange={e => setForm({ ...form, quantity: e.target.value })}
      />

      <input
        type="text"
        placeholder="Reason"
        value={form.reason}
        onChange={e => setForm({ ...form, reason: e.target.value })}
      />

      <button onClick={submit}>
        Submit
      </button>

    </EmployeeLayout>

  );
}