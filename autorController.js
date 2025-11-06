// autorController.js

const db = require('./db'); // Importa la conexión a la BD

// ----------------------
// C - CREATE (Crear Autor)
// ----------------------
exports.crearAutor = async (req, res) => {
    const { nombre, nacionalidad } = req.body;
    
    // Consulta SQL para insertar
    const sql = 'INSERT INTO autor (nombre, nacionalidad) VALUES (?, ?)';
    
    try {
        const [result] = await db.query(sql, [nombre, nacionalidad]);
        res.status(201).json({ 
            mensaje: 'Autor creado exitosamente', 
            id: result.insertId,
            autor: { nombre, nacionalidad }
        });
    } catch (error) {
        console.error("Error al crear autor:", error);
        res.status(500).json({ mensaje: 'Error interno del servidor al crear autor', error: error.message });
    }
};

// ----------------------
// R - READ (Leer Autores)
// ----------------------
exports.obtenerAutores = async (req, res) => {
    // Consulta SQL para seleccionar todos
    const sql = 'SELECT id, nombre, nacionalidad, fecha_creacion FROM autor ORDER BY id DESC';
    
    try {
        const [rows] = await db.query(sql);
        res.status(200).json(rows); // Devuelve la lista de autores
    } catch (error) {
        console.error("Error al obtener autores:", error);
        res.status(500).json({ mensaje: 'Error interno del servidor al obtener autores', error: error.message });
    }
};

// ----------------------
// R - READ (Leer Autor por ID)
// ----------------------
exports.obtenerAutorPorId = async (req, res) => {
    const { id } = req.params; // Captura el ID desde la URL
    const sql = 'SELECT id, nombre, nacionalidad, fecha_creacion FROM autor WHERE id = ?';
    
    try {
        const [rows] = await db.query(sql, [id]);
        
        if (rows.length === 0) {
            return res.status(404).json({ mensaje: 'Autor no encontrado' });
        }
        
        res.status(200).json(rows[0]); // Devuelve el primer (y único) registro
    } catch (error) {
        console.error("Error al obtener autor:", error);
        res.status(500).json({ mensaje: 'Error interno del servidor al obtener autor', error: error.message });
    }
};

// ----------------------
// U - UPDATE (Actualizar Autor)
// ----------------------
exports.actualizarAutor = async (req, res) => {
    const { id } = req.params;
    const { nombre, nacionalidad } = req.body;
    
    // Consulta SQL para actualizar. Solo actualiza nombre y nacionalidad.
    const sql = 'UPDATE autor SET nombre = ?, nacionalidad = ? WHERE id = ?';
    
    try {
        const [result] = await db.query(sql, [nombre, nacionalidad, id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Autor no encontrado para actualizar' });
        }
        
        res.status(200).json({ mensaje: 'Autor actualizado exitosamente', id: id });
    } catch (error) {
        console.error("Error al actualizar autor:", error);
        res.status(500).json({ mensaje: 'Error interno del servidor al actualizar autor', error: error.message });
    }
};

// ----------------------
// D - DELETE (Eliminar Autor)
// ----------------------
exports.eliminarAutor = async (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM autor WHERE id = ?';
    
    try {
        const [result] = await db.query(sql, [id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Autor no encontrado para eliminar' });
        }
        
        res.status(200).json({ mensaje: 'Autor eliminado exitosamente', id: id });
    } catch (error) {
        console.error("Error al eliminar autor:", error);
        res.status(500).json({ mensaje: 'Error interno del servidor al eliminar autor', error: error.message });
    }
};