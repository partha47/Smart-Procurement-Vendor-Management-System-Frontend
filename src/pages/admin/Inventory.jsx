

import React,{useEffect,useState} from "react";
import api from "../../api/axios";
import "./master.css";

export default function Inventory(){

const [inventory,setInventory] = useState([]);
const [items,setItems] = useState([]);
const [search,setSearch] = useState("");

const [form,setForm] = useState({
quantityAvailable:"",
warehouseLocation:"",
itemId:""
});

const [editId,setEditId] = useState(null);

useEffect(()=>{
load();
},[]);

const load = async()=>{
const inv = await api.get("/inventory");
const item = await api.get("/items");

setInventory(inv.data);
setItems(item.data);
}

const save = async()=>{

if(editId){
await api.put(`/inventory/${editId}`,form);
setEditId(null);
}else{

await api.post("/inventory",{
quantityAvailable:form.quantityAvailable,
warehouseLocation:form.warehouseLocation,
item:{id:form.itemId}
});

}

load();
}

const deleteInventory = async(id)=>{
await api.delete(`/inventory/${id}`);
load();
}

const getById = async(id)=>{
const res = await api.get(`/inventory/${id}`);
setForm({
quantityAvailable:res.data.quantityAvailable,
warehouseLocation:res.data.warehouseLocation,
itemId:res.data.item.id
});
setEditId(id);
}

return(

<div className="container">

<h2>Inventory</h2>

<input
placeholder="Search"
onChange={e=>setSearch(e.target.value)}
/>

<form>

<select
value={form.itemId}
onChange={e=>setForm({...form,itemId:e.target.value})}
>

<option>Selec Item</option>

{items.map(i=>(
<option key={i.id} value={i.id}>
{i.itemName}
</option>
))}

</select>

<input
placeholder="Quantity"
value={form.quantityAvailable}
onChange={e=>setForm({...form,quantityAvailable:e.target.value})}
/>

<input
placeholder="Warehouse"
value={form.warehouseLocation}
onChange={e=>setForm({...form,warehouseLocation:e.target.value})}
/>

<button type="button" onClick={save}>
{editId ? "Update":"Add"}
</button>

</form>

<table>

<thead>
<tr>
<th>ID</th>
<th>Item</th>
<th>Qty</th>
<th>Action</th>
</tr>
</thead>

<tbody>

{inventory.map(inv=>(

<tr key={inv.id}>

<td>{inv.id}</td>
<td>{inv.item.itemName}</td>
<td>{inv.quantityAvailable}</td>

<td>

<button
className="action-btn"
onClick={()=>getById(inv.id)}
>
Edit
</button>

<button
className="delete-btn"
onClick={()=>deleteInventory(inv.id)}
>
Delete
</button>

</td>

</tr>

))}

</tbody>

</table>

</div>

);
}