




import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function ApprovedRequests() {

  const [approvals, setApprovals] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await api.get("/approvals");
    setApprovals(res.data);
  };

  return (
    <div>

      <h2>Approved Requests</h2>

      {approvals
        .filter(a => a.status === "APPROVED")
        .map(a => (

          <div key={a.id} className="request-card">

            <p><b>Approval ID:</b> {a.id}</p>
            <p><b>Status:</b> {a.status}</p>
            <p><b>Remarks:</b> {a.remarks}</p>

          </div>

        ))}

    </div>
  );
}