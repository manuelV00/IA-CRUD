// server.js
const express = require('express');
const cors = require('cors');
const path = require('path');            // <- NUEVO
const { query } = require('./db'); // <- tu helper de pg

const app = express();

// Middlewares básicos
app.use(cors());
app.use(express.json()); // importante para leer JSON en POST/PUT
app.use(express.static(path.join(__dirname, 'public')));  // <- NUEVO

// ===== Raíz: ahora sirve tu página =====
app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));  // <- CAMBIADO
});

// Healthchecks
app.get('/db/ping', async (_req, res) => {
  try {
    const [rows] = await query('SELECT 1 AS ok');
    res.json({ ok: rows?.[0]?.ok === 1 });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

/* ========= EJEMPLOS CRUD (puedes borrarlos o adaptarlos a tus tablas) ========= */

// Crea tabla de ejemplo si no existe (para pruebas rápidas)
app.get('/setup', async (_req, res) => {
  try {
    await query(`
      CREATE TABLE IF NOT EXISTS items(
        id SERIAL PRIMARY KEY,
        name VARCHAR(120) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);
    res.json({ created: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Listar
app.get('/api/items', async (_req, res) => {
  const [rows] = await query('SELECT id, name, created_at FROM items ORDER BY id DESC');
  res.json(rows);
});

// Crear
app.post('/api/items', async (req, res) => {
  const { name } = req.body || {};
  if (!name) return res.status(400).json({ error: 'name requerido' });

  const [rows] = await query(
    'INSERT INTO items(name) VALUES($1) RETURNING id, name, created_at',
    [name]
  );
  res.status(201).json(rows[0]);
});

// Detalle
app.get('/api/items/:id', async (req, res) => {
  const { id } = req.params;
  const [rows] = await query('SELECT id, name, created_at FROM items WHERE id = $1', [id]);
  if (!rows.length) return res.status(404).json({ error: 'No encontrado' });
  res.json(rows[0]);
});

// Actualizar
app.put('/api/items/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body || {};
  if (!name) return res.status(400).json({ error: 'name requerido' });

  const [rows] = await query(
    'UPDATE items SET name = $1 WHERE id = $2 RETURNING id, name, created_at',
    [name, id]
  );
  if (!rows.length) return res.status(404).json({ error: 'No encontrado' });
  res.json(rows[0]);
});

// Borrar
app.delete('/api/items/:id', async (req, res) => {
  const { id } = req.params;
  const [rows] = await query(
    'DELETE FROM items WHERE id = $1 RETURNING id, name, created_at',
    [id]
  );
  if (!rows.length) return res.status(404).json({ error: 'No encontrado' });
  res.json({ deleted: rows[0] });
});

// Arranque para Render (PORT dinámico + 0.0.0.0)
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server on http://localhost:${PORT}`);
});
