// db.js  (versión PostgreSQL compatible con mysql2-style)
const { Pool } = require('pg');

const isProd = process.env.NODE_ENV === 'production';

// Usa DATABASE_URL en Render. Para local, cambia la URL si tienes Postgres local.
const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    'postgres://postgres:postgres@localhost:5432/ia_crud_dev',
  ssl: isProd ? { rejectUnauthorized: false } : false,
});

/**
 * Compatibilidad con mysql2:
 * - mysql2: const [rows] = await pool.query(sql, params)
 * - aquí:   hacemos que query devuelva [rows] también.
 */
async function query(sql, params = []) {
  const res = await pool.query(sql, params);
  return [res.rows, res]; // [rows, fields] (fields no aplica en pg, pero mantenemos la firma)
}

module.exports = { query, pool };
