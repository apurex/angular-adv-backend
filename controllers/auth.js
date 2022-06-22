const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");
const Usuario = require("../models/usuario");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Varificar contrasena

    const usuarioDB = await Usuario.findOne({ email });

    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un usuario con ese Email...",
      });
    }

    // Varificar contrasena
    const validPassword = bcrypt.compareSync(password, usuarioDB.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Contrasena no es validad",
      });
    }

    // Generar el TOKEN = JWT
    const token = await generarJWT(usuarioDB.id);

    res.json({
      ok: false,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};

module.exports = {
  login,
};
