import React, { useEffect, useState } from "react";
import API from "../../api/axios";

export default function Reports() {

  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = () => {

    API.get("/reports/spend")
      .then(res => {
        setReports(res.data);
      })
      .catch(err => console.error(err));

  };

  return (
    <div>

      <h2>Company Spend Report</h2>

      <table border="1" cellPadding="10">

        <thead>
          <tr>
            <th>PO Number</th>
            <th>Order Date</th>
            <th>Vendor</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>

          {reports.map((po) => (

            <tr key={po.id}>

              <td>{po.poNumber}</td>

              <td>{po.orderDate}</td>

              <td>
                {po.vendor?.companyName || po.vendor?.email}
              </td>

              <td>{po.status}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}