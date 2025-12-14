import { useEffect, useState } from "react";
import axios from "../api/axios";
import SweetCard from "../components/SweetCard";
import SweetForm from "../components/SweetForm";

export default function Dashboard() {
  const [sweets, setSweets] = useState([]);
  const token = localStorage.getItem("token");

  const loadSweets = () => {
    axios
      .get("/sweets", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => setSweets(res.data));
  };

  useEffect(() => {
    loadSweets();
  }, []);

  return (
    <div>
      <h2>Sweet Shop Dashboard</h2>
      <SweetForm reload={loadSweets} />
      {sweets.map(s => (
        <SweetCard key={s._id} sweet={s} reload={loadSweets} />
      ))}
    </div>
  );
}
