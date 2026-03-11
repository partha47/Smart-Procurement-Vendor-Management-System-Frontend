// import { useState } from "react";
// import API from "../../api/axios";

// export default function VendorDashboard(){

//  const [vendorId,setVendorId]=useState("");

//  const upload = async ()=>{
//    await API.post("/vendor-documents",{
//      vendorId,
//      documentName:"GST Certificate",
//      documentNumber:"GST12345"
//    });
//    alert("Document Uploaded");
//  }

//  return(
//   <div>
//    <h2>Vendor Portal</h2>
//    <input placeholder="Vendor Id" onChange={e=>setVendorId(e.target.value)}/>
//    <button onClick={upload}>Upload GST</button>
//   </div>
//  );
// }