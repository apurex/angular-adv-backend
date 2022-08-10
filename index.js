const express = require("express");
require("dotenv").config();
const cors = require("cors");
const path = require("path");

const { dbConnection } = require("./database/config");

// Crear servidor express
const app = express();

// Configurar CORS
app.use(cors());

// Carpeta publica
app.use(express.static("public"));

// Lectura y parseo del body
app.use(express.json());

// Base de datos
dbConnection();

// Rutas
app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/hospitales", require("./routes/hospitales"));
app.use("/api/medicos", require("./routes/medicos"));
app.use("/api/login", require("./routes/auth"));
app.use("/api/todo", require("./routes/busquedas"));
app.use("/api/uploads", require("./routes/uploads"));

// Lo ultimo
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public/index.html"));
});

app.listen(process.env.PORT, () => {
  console.log("Servidor corriendo en el puesto " + process.env.PORT);
});
