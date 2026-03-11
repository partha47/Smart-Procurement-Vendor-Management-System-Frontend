

import { useEffect, useState } from "react";
import api from "../../api/axios";
import EmployeeLayout from "./EmployeeLayout";

export default function TrackStatus(){

const [reqs,setReqs] = useState([]);

const [id,setId] = useState("");
const [approval,setApproval] = useState([]);
const [po,setPo] = useState([]);
const [delivery,setDelivery] = useState([]);


// load requisitions table
useEffect(()=>{
load();
},[]);

const load = async()=>{
try{
const res = await api.get("/requisitions");
setReqs(res.data);
}catch(err){
console.error(err);
}
};


// // track requisition
// const track = async()=>{

// if(!id){
// alert("Enter Requisition ID");
// return;
// }


// // APPROVAL
// try{
// const approvalRes = await api.get(`/approvals/${id}`);
// setApproval(approvalRes.data ? [approvalRes.data] : []);
// }catch{
// setApproval([]);
// }


// // PURCHASE ORDERS
// try{
// const poRes = await api.get("/po");
// setPo(poRes.data || []);
// }catch{
// setPo([]);
// }


// // DELIVERIES
// try{
// const delRes = await api.get("/api/deliveries");
// setDelivery(delRes.data || []);
// }catch{
// setDelivery([]);
// }

// };

const track = async()=>{

if(!id){
alert("Enter Requisition ID");
return;
}

// APPROVAL
try{
const approvalRes = await api.get(`/approvals/${id}`);
setApproval(approvalRes.data ? [approvalRes.data] : []);
}catch{
setApproval([]);
}

// PURCHASE ORDER
try{
const poRes = await api.get(`/po/requisition/${id}`);
setPo(poRes.data || []);
}catch{
setPo([]);
}

// DELIVERY
try{
const delRes = await api.get(`/api/deliveries/requisition/${id}`);
setDelivery(delRes.data || []);
}catch{
setDelivery([]);
}

};

return(

<EmployeeLayout>

<div style={{display:"flex",gap:"40px"}}>

{/* LEFT SIDE TABLE */}

<div style={{flex:2}}>

<h2>Track Procurement Status</h2>

<table border="1" style={{width:"100%"}}>

<thead style={{background:"#2faa1a",color:"white"}}>
<tr>
<th>Requisition ID</th>
<th>Status</th>
</tr>
</thead>

<tbody>

{reqs.map(r=>(

<tr key={r.id}>
<td>{r.id}</td>
<td>{r.status}</td>
</tr>

))}

</tbody>

</table>

</div>



{/* RIGHT SIDE TRACK PANEL */}

<div style={{flex:1}}>

<h2>Track Status</h2>

<input
placeholder="Requisition Id"
value={id}
onChange={e=>setId(e.target.value)}
/>

<button onClick={track} style={{marginLeft:"10px"}}>
Track
</button>


<h3 style={{marginTop:"20px"}}>Approvals</h3>

<ul>
{approval.length>0 ? (
approval.map((a,index)=>(
<li key={a.id ?? index}>
Manager : {a.managerName} | Decision : {a.decision}
</li>
))
):(
<li>No approvals</li>
)}
</ul>


<h3>Purchase Orders</h3>

<ul>
{po.length>0 ? (
po.map((p,index)=>(
<li key={p.id ?? index}>
PO #{p.id}
</li>
))
):(
<li>No purchase orders</li>
)}
</ul>


<h3>Deliveries</h3>

<ul>
{delivery.length>0 ? (
delivery.map((d,index)=>(
<li key={d.id ?? index}>
Tracking : {d.trackingNumber} | Status : {d.deliveryStatus}
</li>
))
):(
<li>No deliveries</li>
)}
</ul>

</div>

</div>

</EmployeeLayout>

);
}