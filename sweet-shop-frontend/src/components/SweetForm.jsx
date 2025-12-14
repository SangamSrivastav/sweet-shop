import { useState } from "react";
import axios from "../api/axios";

export default function SweetForm({ reload }) {
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    quantity: ""
  });

  const token = localStorage.getItem("token");

  const submit = async () => {
    await axios.post("/sweets", form, {
      headers: { Authorization: `Bearer ${token}` }
    });
    reload();
  };

  return (
    <div>
      <h3>Add Sweet (Admin)</h3>
      <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Category" onChange={e => setForm({ ...form, category: e.target.value })} />
      <input type="number" placeholder="Price" onChange={e => setForm({ ...form, price: e.target.value })} />
      <input type="number" placeholder="Quantity" onChange={e => setForm({ ...form, quantity: e.target.value })} />
      <button onClick={submit}>Add Sweet</button>
    </div>
  );
}
