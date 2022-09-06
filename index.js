require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./db/config');


//  Conexion base de datos
dbConnection();

// Crear server express
const app = express();

// Configuracion CORS
app.use(cors());

// Lectura y parseo del body
app.use( express.json() );

// Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));


app.listen(process.env.PORT, () => {
    console.log('servidor corriendo en puerto',process.env.PORT);
})