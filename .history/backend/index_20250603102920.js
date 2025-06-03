const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "mydb",
  password: "postgres",
  port: 5433,
});

// API pour obtenir les items
app.get("/api/items", async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM items");
  res.json(rows);
});

// API pour ajouter un item
app.post("items/api/", async (req, res) => {
  const { name } = req.body;
  await pool.query("INSERT INTO items (name) VALUES ($1)", [name]);
  res.status(201).send("Item créé");
});

app.listen(4000, () => console.log("Backend en écoute sur le port 4000"));
