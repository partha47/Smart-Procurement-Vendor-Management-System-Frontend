





import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function PendingApprovals() {

  const [list, setList] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await api.get("/requisitions");
    setList(res.data);
  };

  const approve = async (id) => {

    await api.post(`/approvals/${id}`, {
      managerId: 2,
      status: "APPROVED",
      remarks: "Approved by manager"
    });

    alert("Approved Successfully");
    load();
  };

  return (
    <div>

      <h2>Pending Approvals</h2>

      {list
        .filter(r => r.status === "PENDING")
        .map(r => (

          <div key={r.id} className="request-card">

            <p><b>ID:</b> {r.id}</p>
            <p><b>Item:</b> {r.item?.itemName}</p>
            <p><b>Quantity:</b> {r.quantity}</p>
            <p><b>Status:</b> {r.status}</p>

            <button
              className="approve-btn"
              onClick={() => approve(r.id)}
            >
              Approve
            </button>

          </div>

        ))}
    </div>
  );
}