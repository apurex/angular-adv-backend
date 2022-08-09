/**
 * Ruta: /api/usuarios
 */

const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const {
  getUsuarios,
  crearUsuarios,
  actualizarUsuarios,
  borrarUsuario,
} = require("../controllers/usuarios");
const {
  validatJWT,
  validarAdminRole,
  validarAdminRole_MismoUsuario,
} = require("../middlewares/validar-jwt");

const router = Router();

router.get("/", validatJWT, getUsuarios);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "La contrasena es obligatoria").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    validarCampos,
  ],
  crearUsuarios
);

router.put(
  "/:id",
  [
    validatJWT,
    validarAdminRole_MismoUsuario,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("role", "El role es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  actualizarUsuarios
);

router.delete("/:id", [validatJWT, validarAdminRole], borrarUsuario);

module.exports = router;
