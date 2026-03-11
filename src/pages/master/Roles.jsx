


import { useEffect, useState } from 'react';
import { getRoles, createRole } from '../../api/roleService';
import API from '../../api/axios';
import "./master.css";

export default function Roles() {

  const [roles, setRoles] = useState([]);
  const [roleName, setRoleName] = useState('');
  const [searchId,setSearchId]=useState('');

  const loadRoles = async () => {
    const res = await getRoles();
    setRoles(res.data);
  };

  useEffect(() => {
    loadRoles();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createRole({ roleName });
    setRoleName('');
    loadRoles();
  };

  const searchRole = async () =>{
    const res = await API.get(`/roles/${searchId}`);
    setRoles([res.data]);
  }

  const deleteRole = async (id)=>{
    await API.delete(`/roles/${id}`);
    loadRoles();
  }

  const updateRole = async (id)=>{
    const newName = prompt("Enter new role name");
    if(!newName) return;

    await API.put(`/roles/${id}`,{roleName:newName});
    loadRoles();
  }

  return (
    <div className="container">

      <h2>Roles Management</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Role Name"
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
          required
        />
        <button type="submit">Add Role</button>
      </form>

      {/* SEARCH */}
      <div style={{marginBottom:20}}>
        <input
          placeholder="Search Role ID"
          value={searchId}
          onChange={(e)=>setSearchId(e.target.value)}
        />
        <button onClick={searchRole}>Search</button>
        <button onClick={loadRoles}>Reset</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Role Name</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {roles.map(r => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.roleName}</td>
              <td>

                <button
                  className="action-btn"
                  onClick={()=>updateRole(r.id)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={()=>deleteRole(r.id)}
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