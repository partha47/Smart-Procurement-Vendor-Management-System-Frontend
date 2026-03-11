









import { useEffect, useState } from "react";
import api from "../../api/axios";
import EmployeeLayout from "./EmployeeLayout";

export default function MyRequisitions() {

const [data,setData] = useState([]);
const [searchId,setSearchId] = useState("");

const [selected,setSelected] = useState(null);
const [showPopup,setShowPopup] = useState(false);

const [edit,setEdit] = useState(false);
const [editForm,setEditForm] = useState({
quantity:"",
reason:""
});

useEffect(()=>{
load();
},[]);


// LOAD ALL REQUISITIONS
const load = async () => {
try{
const res = await api.get("/requisitions");

const result = Array.isArray(res.data) ? res.data : [res.data];

setData(result);
}catch(err){
console.error("Error loading requisitions",err);
setData([]);
}
};


// SEARCH BY ID
const search = async () => {

try{

if(!searchId){
load();
return;
}

const res = await api.get(`/requisitions/${searchId}`);

const result = Array.isArray(res.data) ? res.data : [res.data];

setData(result);

}catch(err){
alert("Requisition not found");
setData([]);
}

};


// VIEW DETAILS
const viewById = async(id)=>{

try{

const res = await api.get(`/requisitions/${id}`);

setSelected(res.data);

setEditForm({
quantity:res.data.quantity || "",
reason:res.data.reason || ""
});

setShowPopup(true);
setEdit(false);

}catch(err){
console.error("Error fetching requisition",err);
}

};


// DELETE
const deleteReq = async(id)=>{

if(!window.confirm("Delete this requisition?")) return;

try{

await api.delete(`/requisitions/${id}`);

alert("Deleted successfully");

load();

}catch(err){
console.error("Delete error",err);
alert("Delete failed");
}

};


// UPDATE
const updateReq = async()=>{

try{

await api.put(`/requisitions/${selected.id}`,{

quantity:Number(editForm.quantity),
reason:editForm.reason

});

alert("Updated successfully");

setShowPopup(false);

load();

}catch(err){
console.error("Update error",err);
alert("Update failed");
}

};


return(

<EmployeeLayout>

<h2>My Requisitions</h2>


{/* SEARCH */}

<div style={{marginBottom:"20px"}}>

<input
placeholder="Search Requisition ID"
value={searchId}
onChange={e=>setSearchId(e.target.value)}
/>

<button onClick={search}>
Search
</button>

<button onClick={load}>
Reset
</button>

</div>



{/* TABLE */}

<table border="1" cellPadding="10">

<thead>

<tr>
<th>ID</th>
<th>Item</th>
<th>Quantity</th>
<th>Status</th>
<th>Action</th>
</tr>

</thead>

<tbody>

{Array.isArray(data) && data.length > 0 ? (

data.map(r=>(

<tr key={r.id}>

<td>{r.id}</td>

<td>{r.item?.itemName}</td>

<td>{r.quantity}</td>

<td>{r.status}</td>

<td>

<button onClick={()=>viewById(r.id)}>
View
</button>

{/* <button onClick={()=>deleteReq(r.id)}>
Delete
</button> */}

</td>

</tr>

))

) : (

<tr>
<td colSpan="5">No Requisitions Found</td>
</tr>

)}

</tbody>

</table>



{/* POPUP */}

{showPopup && selected && (

<div style={{
position:"fixed",
top:0,
left:0,
width:"100%",
height:"100%",
background:"rgba(0,0,0,0.4)",
display:"flex",
justifyContent:"center",
alignItems:"center"
}}>

<div style={{
background:"white",
padding:"30px",
borderRadius:"10px",
width:"400px"
}}>

<h3>Requisition Details</h3>

<p><b>ID :</b> {selected.id}</p>

<p><b>Item :</b> {selected.item?.itemName}</p>

<p><b>Status :</b> {selected.status}</p>


{edit ? (

<>

<label>Quantity</label>

<input
type="number"
value={editForm.quantity}
onChange={e=>setEditForm({...editForm,quantity:e.target.value})}
/>

<label>Reason</label>

<input
value={editForm.reason}
onChange={e=>setEditForm({...editForm,reason:e.target.value})}
/>

<br/><br/>

<button onClick={updateReq}>
Save
</button>

</>

) : (

<>

<p><b>Quantity :</b> {selected.quantity}</p>

<p><b>Reason :</b> {selected.reason}</p>

<button onClick={()=>setEdit(true)}>
Edit
</button>

</>

)}

<br/><br/>

<button onClick={()=>setShowPopup(false)}>
Close
</button>

</div>

</div>

)}

</EmployeeLayout>

);
}

