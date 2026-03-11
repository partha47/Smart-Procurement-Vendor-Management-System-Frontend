





import { useEffect, useState } from 'react';
import { getDepartments, createDepartment } from '../../api/departmentService';
import API from '../../api/axios';
import "./master.css";

export default function Departments() {

  const [departments, setDepartments] = useState([]);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [searchId,setSearchId]=useState('');

  const load = async () => {
    const res = await getDepartments();
    setDepartments(res.data);
  };

  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    await createDepartment({ name, location });
    setName('');
    setLocation('');
    load();
  };

  const searchDept = async ()=>{
    const res = await API.get(`/departments/${searchId}`);
    setDepartments([res.data]);
  }

  const deleteDept = async(id)=>{
    await API.delete(`/departments/${id}`);
    load();
  }

  const updateDept = async(id)=>{
    const newName = prompt("Department Name");
    const newLocation = prompt("Location");

    await API.put(`/departments/${id}`,{
      name:newName,
      location:newLocation
    });

    load();
  }

  return (
    <div className="container">

      <h2>Departments</h2>

      <form onSubmit={submit}>
        <input placeholder="Department Name" value={name} onChange={e=>setName(e.target.value)} required />
        <input placeholder="Location" value={location} onChange={e=>setLocation(e.target.value)} required />
        <button>Add</button>
      </form>

      <div style={{marginBottom:20}}>
        <input
          placeholder="Search Department ID"
          value={searchId}
          onChange={(e)=>setSearchId(e.target.value)}
        />
        <button onClick={searchDept}>Search</button>
        <button onClick={load}>Reset</button>
      </div>

      <table>

        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {departments.map(d => (
            <tr key={d.id}>
              <td>{d.id}</td>
              <td>{d.name}</td>
              <td>{d.location}</td>

              <td>

                <button
                  className="action-btn"
                  onClick={()=>updateDept(d.id)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={()=>deleteDept(d.id)}
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