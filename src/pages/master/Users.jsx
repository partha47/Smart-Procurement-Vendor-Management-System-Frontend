

import { useEffect, useState } from "react";
import {
  getUsers,
  createUser,
  deleteUser,
  updateUser,
  getUserById
} from "../../api/userService";

import { getRoles } from "../../api/roleService";
import { getDepartments } from "../../api/departmentService";

import "./UserStyles.css";

export default function Users() {

  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [searchId, setSearchId] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    username: "",
    password: "",
    email: "",
    roleId: "",
    departmentId: "",
    active: true
  });

  const load = async () => {

    const u = await getUsers();
    setUsers(u.data);

    const r = await getRoles();
    setRoles(r.data);

    const d = await getDepartments();
    setDepartments(d.data);
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async (e) => {

    e.preventDefault();

    const payload = {
      username: form.username,
      password: form.password,
      email: form.email,
      active: form.active,
      role: { id: form.roleId },
      department: { id: form.departmentId }
    };

    if (editingId) {
      await updateUser(editingId, payload);
      setEditingId(null);
    } else {
      await createUser(payload);
    }

    setForm({
      username: "",
      password: "",
      email: "",
      roleId: "",
      departmentId: "",
      active: true
    });

    load();
  };

  const editUser = (user) => {

    setEditingId(user.id);

    setForm({
      username: user.username,
      password: "",
      email: user.email,
      roleId: user.role?.id,
      departmentId: user.department?.id,
      active: user.active
    });
  };

  const removeUser = async (id) => {

    await deleteUser(id);
    load();
  };

  const searchUser = async () => {

    if (!searchId) return;

    const res = await getUserById(searchId);
    setUsers([res.data]);
  };

  return (
    <div className="user-container">

      <h2 className="title">User Management</h2>

      {/* SEARCH */}
      <div className="search-bar">

        <input
          placeholder="Search by User ID"
          value={searchId}
          onChange={(e)=>setSearchId(e.target.value)}
        />

        <button className="search-btn" onClick={searchUser}>
          Search
        </button>

        <button className="reset-btn" onClick={load}>
          Reset
        </button>

      </div>

      {/* FORM */}
      <form className="user-form" onSubmit={submit}>

        <input
          placeholder="Username"
          value={form.username}
          onChange={(e)=>setForm({...form,username:e.target.value})}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e)=>setForm({...form,email:e.target.value})}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e)=>setForm({...form,password:e.target.value})}
          required
        />

        {/* ROLE */}
        <select
          value={form.roleId}
          onChange={(e)=>setForm({...form,roleId:e.target.value})}
          required
        >
          <option value="">Select Role</option>

          {roles.map((r)=>(
            <option key={r.id} value={r.id}>
              {r.roleName}
            </option>
          ))}

        </select>

        {/* DEPARTMENT */}
        <select
          value={form.departmentId}
          onChange={(e)=>setForm({...form,departmentId:e.target.value})}
          required
        >

          <option value="">Select Department</option>

          {departments.map((d)=>(
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}

        </select>

        <label>
          <input
            type="checkbox"
            checked={form.active}
            onChange={(e)=>setForm({...form,active:e.target.checked})}
          />
          Active
        </label>

        <button className="submit-btn">
          {editingId ? "Update User" : "Create User"}
        </button>

      </form>

      {/* TABLE */}
      <table className="user-table">

        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Department</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {users.map((u)=>(
            <tr key={u.id}>

              <td>{u.id}</td>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>{u.role?.roleName}</td>
              <td>{u.department?.name}</td>

              <td>
                <span className={u.active ? "status-active" : "status-inactive"}>
                  {u.active ? "Active" : "Inactive"}
                </span>
              </td>

              <td>

                <button
                  className="edit-btn"
                  onClick={()=>editUser(u)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={()=>removeUser(u.id)}
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