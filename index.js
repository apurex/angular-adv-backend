const express = require('express');
require('dotenv').config();
const cors = require('cors')

const { dbConnection } = require('./database/config');

// Crear servidor express
const app = express();

// Configurar CORS
app.use(cors());

// Base de datos
dbConnection();


app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en el puesto ' + process.env.PORT);
});