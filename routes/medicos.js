/**
 * Ruta: /api/medicos
 */

const { Router } = require("express");
const { check } = require("express-validator");
const {
  getMedicos,
  crearMedico,
  actualizarMedico,
  borrarMedico,
} = require("../controllers/medicos");

const { validarCampos } = require("../middlewares/validar-campos");

const { validatJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.get("/", getMedicos);

router.post(
  "/",
  [
    validatJWT,
    check("nombre", "El nombre del medico es necesario").not().isEmpty(),
    check("hospital", "El hospital id debe ser valido").isMongoId(),
    validarCampos,
  ],
  crearMedico
);

router.put(
  "/:id",
  [
    validatJWT,
    check("nombre", "El nombre del medico es necesario").not().isEmpty(),
    check("hospital", "El hospital id debe ser valido").isMongoId(),
    validarCampos,
  ],
  actualizarMedico
);

router.delete("/:id", borrarMedico);

module.exports = router;
