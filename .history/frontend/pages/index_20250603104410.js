import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/items")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erreur lors de la récupération des données");
        }
        return res.json();
      })
      .then((data) => setData(data))
      .catch((error) => {
        console.error("Erreur lors de la récupération des items :", error);
        setError(error.message);
      });
  }, []);

  return (
    <div>
      <h1>Liste des items</h1>
      {error && <p style={{ color: "red" }}>Erreur : {error}</p>}
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
