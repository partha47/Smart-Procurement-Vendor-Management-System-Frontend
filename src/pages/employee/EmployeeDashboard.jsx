





import { useEffect, useState } from "react";
import api from "../../api/axios";
import EmployeeLayout from "./EmployeeLayout";

export default function EmployeeDashboard(){

const [items,setItems] = useState([]);
const [inventory,setInventory] = useState([]);
const [reqs,setReqs] = useState([]);

useEffect(()=>{
load();
},[]);

const load = async()=>{

const i = await api.get("/items");
const inv = await api.get("/inventory");
const r = await api.get("/requisitions");

setItems(i.data);
setInventory(inv.data);
setReqs(r.data);

}

return(

<EmployeeLayout>

<h2>Employee Dashboard</h2>

<h3>Available Items</h3>

<table>

<thead>
<tr>
<th>ID</th>
<th>Name</th>
<th>Category</th>
</tr>
</thead>

<tbody>

{items.map(i=>(

<tr key={i.id}>
<td>{i.id}</td>
<td>{i.itemName}</td>
<td>{i.category}</td>
</tr>

))}

</tbody>

</table>

<h3>Inventory</h3>

<table>

<thead>
<tr>
<th>Item</th>
<th>Available</th>
</tr>
</thead>

<tbody>

{inventory.map(inv=>(

<tr key={inv.id}>
<td>{inv.item?.itemName}</td>
<td>{inv.quantityAvailable}</td>
</tr>

))}

</tbody>

</table>

</EmployeeLayout>

);
}