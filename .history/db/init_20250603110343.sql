CREATE TABLE IF NOT EXISTS items (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

INSERT INTO items (name) VALUES
  ('Prénom 1'),
  ('Item 2'),
  ('Item 3');
