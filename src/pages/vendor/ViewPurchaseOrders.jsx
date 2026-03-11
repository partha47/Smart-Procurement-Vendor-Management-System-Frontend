







import { useEffect, useState } from "react";
import { getVendorPOs } from "../../api/vendorService";

export default function ViewPurchaseOrders() {

  const [orders, setOrders] = useState([]);
  const vendorId = localStorage.getItem("vendorId");

  useEffect(() => {

    getVendorPOs(vendorId)
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));

  }, []);

  return (
    <div>

      <h3>Purchase Orders</h3>

      <table border="1" cellPadding="10">

        <thead>
          <tr>
            <th>PO Number</th>
            <th>Order Date</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>

          {orders.map(po => (

            <tr key={po.id}>
              <td>{po.poNumber}</td>
              <td>{po.orderDate}</td>
              <td>{po.status}</td>
            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}