// db.js  (versión PostgreSQL compatible con mysql2-style)
const { Pool } = require('pg');

const isProd = process.env.NODE_ENV === 'production';
// ⚠️ Cambio mínimo: si existe DATABASE_URL (Render), forzamos SSL
const useSSL = !!process.env.DATABASE_URL || isProd;

const pool = new Pool({
  // Usa DATABASE_URL en Render. La de abajo es tu fallback con sslmode=require.
  connectionString:
    process.env.DATABASE_URL ||
    'postgresql://ia_crud_db_user:HhNdlVRdAE7GlzqIqDIITFXimEXwzn1u@dpg-d474ej15pdvs73dmaoig-a.oregon-postgres.render.com/ia_crud_db?sslmode=require',
  ssl: useSSL ? { rejectUnauthorized: false } : false,
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
