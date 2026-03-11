


import { useEffect, useState } from "react";
import { getVendorRatings } from "../../api/vendorService";

export default function VendorRatings() {

  const [ratings, setRatings] = useState([]);
  const vendorId = localStorage.getItem("vendorId");

  useEffect(() => {

    getVendorRatings(vendorId)
      .then(res => setRatings(res.data))
      .catch(err => console.error(err));

  }, []);

  return (
    <div>

      <h3>Vendor Ratings</h3>

      <table border="1" cellPadding="10">

        <thead>
          <tr>
            <th>Quality</th>
            <th>Delivery</th>
            <th>Price</th>
          </tr>
        </thead>

        <tbody>

          {ratings.map(r => (

            <tr key={r.id}>
              <td>{r.qualityScore}</td>
              <td>{r.deliveryScore}</td>
              <td>{r.priceScore}</td>
            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}