import axios from "../api/axios";

export default function SweetCard({ sweet, reload }) {
  const token = localStorage.getItem("token");

  const purchase = async () => {
    await axios.post(
      `/sweets/${sweet._id}/purchase`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    reload();
  };

  return (
    <div style={{ border: "1px solid gray", padding: "10px", margin: "10px" }}>
      <h4>{sweet.name}</h4>
      <p>Category: {sweet.category}</p>
      <p>Price: ₹{sweet.price}</p>
      <p>Stock: {sweet.quantity}</p>

      <button disabled={sweet.quantity === 0} onClick={purchase}>
        Purchase
      </button>
    </div>
  );
}
