




import { useEffect, useState } from "react";
import api from "../../api/axios";
import "./master.css";

export default function Items(){

const [items,setItems] = useState([]);
const [editId,setEditId] = useState(null);

const [form,setForm] = useState({
itemName:"",
category:"",
price:""
});

useEffect(()=>{
load();
},[]);

const load = async()=>{
const res = await api.get("/items");
setItems(res.data);
}

const save = async()=>{

if(editId){
await api.put(`/items/${editId}`,form);
setEditId(null);
}else{
await api.post("/items",form);
}

setForm({itemName:"",category:"",price:""});
load();
}

const deleteItem = async(id)=>{
await api.delete(`/items/${id}`);
load();
}

const getById = async(id)=>{
const res = await api.get(`/items/${id}`);
setForm(res.data);
setEditId(id);
}

return(

<div className="container">

<h2>Items</h2>

<form>

<input
placeholder="Item Name"
value={form.itemName}
onChange={e=>setForm({...form,itemName:e.target.value})}
/>

<input
placeholder="Category"
value={form.category}
onChange={e=>setForm({...form,category:e.target.value})}
/>

<input
placeholder="Price"
value={form.price}
onChange={e=>setForm({...form,price:e.target.value})}
/>

<button type="button" onClick={save}>
{editId ? "Update":"Save"}
</button>

</form>

<table>

<thead>
<tr>
<th>Name</th>
<th>Category</th>
<th>Price</th>
<th>Action</th>
</tr>
</thead>

<tbody>

{items.map(i=>(

<tr key={i.id}>

<td>{i.itemName}</td>
<td>{i.category}</td>
<td>{i.price}</td>

<td>

<button
className="action-btn"
onClick={()=>getById(i.id)}
>
Edit
</button>

<button
className="delete-btn"
onClick={()=>deleteItem(i.id)}
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