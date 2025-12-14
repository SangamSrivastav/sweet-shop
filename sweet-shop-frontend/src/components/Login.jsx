import { useState } from "react";
import axios from "../api/axios";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });

  const login = async () => {
    const res = await axios.post("/auth/login", form);
    localStorage.setItem("token", res.data.token);
    alert("Login successful");
  };

  return (
    <div>
      <h3>Login</h3>
      <input
        placeholder="Username"
        onChange={e => setForm({ ...form, username: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={e => setForm({ ...form, password: e.target.value })}
      />
      <button onClick={login}>Login</button>
    </div>
  );
}
