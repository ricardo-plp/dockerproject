import { useEffect, useState } from "react";

export default function Home() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [error, setError] = useState(null);

  // Charger les items
  const fetchItems = () => {
    fetch("/api/items")
      .then((res) => {
        if (!res.ok)
          throw new Error("Erreur lors de la récupération des données");
        return res.json();
      })
      .then((data) => setItems(data))
      .catch((error) => {
        console.error("Erreur lors de la récupération des items :", error);
        setError(error.message);
      });
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Ajouter un item
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newItem) return;

    try {
      const res = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newItem }),
      });

      if (!res.ok) throw new Error("Erreur lors de l'ajout de l'item");
      setNewItem("");
      fetchItems(); // recharge la liste
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Liste des </h1>
      {error && <p style={{ color: "red" }}>Erreur : {error}</p>}

      <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Nouvel item"
        />
        <button type="submit" style={{ marginLeft: "0.5rem" }}>
          Ajouter
        </button>
      </form>

      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
