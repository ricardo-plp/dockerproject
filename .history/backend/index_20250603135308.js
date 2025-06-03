const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
    user: 'postgres',
    host: 'db',       // ✅ Utilise le nom du service Docker Compose
    database: 'mydb',
    password: 'postgres',
    port: 5432,       // ✅ Le port interne de PostgreSQL dans le conteneur
  });

pool.connect((err, client, release) => {
  if (err) {
    return console.error(
      "Erreur de connexion à la base de données :",
      err.stack
    );
  }
  console.log("Connecté à la base de données PostgreSQL");
  release();
});

// API pour obtenir les items
app.get("/api/items", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM items");
    console.log("Résultat de la requête :", rows);
    res.json(rows);
  } catch (error) {
    console.error("Erreur lors de la récupération des items :", error.stack);
    res.status(500).json({ error: "Erreur lors de la récupération des items" });
  }
});

// API pour ajouter un item
app.post("/api/items", async (req, res) => {
  const { name } = req.body;
  await pool.query("INSERT INTO items (name) VALUES ($1)", [name]);
  res.status(201).send("Item créé");
});

app.listen(4000, () => console.log("Backend en écoute sur le port 4000"));
