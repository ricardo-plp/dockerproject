CREATE TABLE IF NOT EXISTS items (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

INSERT INTO items (name) VALUES
  ('Prénom 1'),
  ('Prénom 2'),
  ('Prénom 3');
