// db.js

const mysql = require('mysql2');

// Configuración de la conexión a la base de datos "IA-CRUD"
const pool = mysql.createPool({
    host: 'localhost', // O la dirección de tu servidor de BD
    user: 'root',      // Tu usuario de MySQL
    password: '', // Tu contraseña de MySQL
    database: 'IA-CRUD', // Nombre de la base de datos
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Exportar el pool para ser usado en los controladores
module.exports = pool.promise();