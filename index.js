require('dotenv').config();

const path = require('path');

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./db/config');


//  Conexion base de datos
dbConnection();

// Crear server express
const app = express();

// Configuracion CORS
app.use(cors());

// Carpeta Publica
app.use(express.static('public'));

// Lectura y parseo del body
app.use( express.json() );

// Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/uploads', require('./routes/uploads'));
app.use('/api/login', require('./routes/auth'));

// Ruta defecto
app.get('*', (req, resp) => {
 resp.sendFile(path.resolve(__dirname, 'public/index.html'))
});


app.listen(process.env.PORT, () => {
    console.log('servidor corriendo en puerto',process.env.PORT);
})