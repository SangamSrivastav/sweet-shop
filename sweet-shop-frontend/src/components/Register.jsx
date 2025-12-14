import { useState } from "react";
import axios from "../api/axios";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "USER"
  });

  const submit = async () => {
    await axios.post("/auth/register", form);
    alert("Registered successfully");
  };

  return (
    <div>
      <h3>Register</h3>
      <input
        placeholder="Username"
        onChange={e => setForm({ ...form, username: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={e => setForm({ ...form, password: e.target.value })}
      />
      <select onChange={e => setForm({ ...form, role: e.target.value })}>
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
      </select>
      <button onClick={submit}>Register</button>
    </div>
  );
}
