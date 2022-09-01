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

// Rutas
app.get('/', (req, res) => {
    res.json({
        ok:true,
        msg: 'Hola Mundo'
    })
});


app.listen(process.env.PORT, () => {
    console.log('servidor corriendo en puerto',process.env.PORT);
})