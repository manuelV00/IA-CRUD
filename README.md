# 📚 Proyecto CRUD de Autores con Node.js, Express y MySQL

Este repositorio contiene el ejercicio práctico de la construcción de una aplicación tipo **CRUD (Crear, Leer, Actualizar, Eliminar)** para la gestión de una tabla de autores, utilizando **Node.js**, el framework **Express** para el Backend y **MySQL** como base de datos [cite: 231][cite_start], con una interfaz de usuario básica en **HTML/CSS/JavaScript**[cite: 19, 21].

El proyecto se basa en el siguiente esquema de base de datos MySQL:

## ⚙️ Estructura de la Base de Datos

La base de datos se llama `IA-CRUD` , y la tabla para la gestión de autores (`autor`) tiene la siguiente estructura SQL:

```sql
CREATE TABLE autor (
    id INT AUTO_INCREMENT PRIMARY KEY,        -- Identificador único del autor. [cite: 5, 14]
    nombre VARCHAR(100) NOT NULL,             -- Nombre completo del autor (obligatorio). [cite: 6, 15, 129]
    nacionalidad VARCHAR(50),                 -- Nacionalidad del autor (opcional). [cite: 7, 16, 133]
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Fecha de creación automática. [cite: 8, 17, 181]
);
```
🚀 Instalación y Configuración del Proyecto
Para ejecutar este proyecto, debe tener instalado Node.js y un servidor MySQL activo
2.1. Inicialización y Dependencias
Ejecute los siguientes comandos en la carpeta raíz del proyecto (IA-CRUD)3:
npm init -y
npm install express mysql2
2. Configuración de la Base de Datos (db.js)
Cree un archivo llamado db.js y configure los parámetros de conexión para la base de datos IA-CRUD4:
JavaScript
// db.js
const mysql = require('mysql2');
// Configuración de la conexión a la base de datos "IA-CRUD"
const pool = mysql.createPool({
    host: 'localhost', // O la dirección de tu servidor de BD [cite: 240]
    user: 'root',      // Tu usuario de MySQL [cite: 241]
    password: 'your_mysql_password', // ¡IMPORTANTE! Cambiar por tu contraseña real. [cite: 242, 424]
    database: 'IA-CRUD', // Nombre de la base de datos [cite: 243]
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
module.exports = pool.promise(); 
// Exporta el pool con soporte de promesas

3. Ejecutar el ServidorInicie el servidor Express desde la terminal5:
Bash
npm start

Debería ver el mensaje de confirmación de que el servidor está escuchando en el puerto 3000
🚀  Servidor API REST y Frontend escuchando en http://localhost:3000
🌐 API REST Endpoints (Backend)El servidor Express (server.js) define los siguientes endpoints para manejar las operaciones CRUD
Operación
Método HTTP
URL del EndpointCuerpo de la Petición (Ej. JSON)Crear (C)POST/api/autores{"nombre": "Julio Cortázar", "nacionalidad": "Argentina"} 8888Leer Todos (R)GET/api/autores(Ninguno) 9999Leer Uno (R)GET/api/autores/:id(Ninguno) 10101010Actualizar (U)PUT/api/autores/:id{"nombre": "Julio Cortázar (Editado)", "nacionalidad": "Francia"} 11111111Eliminar (D)DELETE/api/autores/:id(Ninguno) 12121212Nota: La lógica del controlador para cada operación se encuentra en el archivo autorController.js13.🖥️ Interfaz de Usuario (Frontend)El frontend es el archivo HTML (ej. autor_crud.html o index.html) que contiene el formulario y la tabla de listado14141414, conectado a la API REST mediante JavaScript.Para acceder al formulario en http://localhost:3000, el archivo HTML debe ubicarse en una carpeta llamada public15151515.Lógica CRUD en el Frontend (JavaScript)El JavaScript implementado en el Frontend maneja el flujo completo de la aplicación, incluyendo16161616:Crear (POST): Maneja el clic en el botón "Crear"17.Actualizar (PUT): Requiere que se seleccione un autor de la lista 18, luego envía una solicitud PUT al endpoint con el ID1919.Eliminar (DELETE): Requiere un ID 20, pide confirmación y envía una solicitud DELETE21212121.Listar (GET): La función cargarAutores() consulta la API y renderiza los datos en la tabla. Esto ocurre al cargar la página y al hacer clic en "Actualizar Lista"22222222.Selección de Datos: Al hacer clic en una fila de la tabla, los datos del autor se cargan en el formulario23.⚠️ Solución de Errores ComunesProblema ReportadoCausaSoluciónCannot GET / en http://localhost:3000La API REST solo tiene rutas definidas con /api/autores24.Se configuró Express (server.js) para servir el archivo autor_crud.html desde la carpeta public en la ruta raíz (/)25252525.Todos los botones CreanEl JavaScript inicial estaba configurado solo para enviar peticiones POST26.Se modificó el HTML para que los botones no fueran de tipo submit 27272727y el JavaScript se reescribió para manejar explícitamente los métodos PUT, DELETE y POST28.HTML no se ejecutaEl servidor Node.js/Express solo maneja la API y no sirve archivos estáticos por defecto29.Se usó el middleware express.static y res.sendFile en server.js para servir el contenido del frontend en la ruta 
