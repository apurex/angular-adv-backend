/**
 * ruta: /api/uploads/
 */

const { Router } = require("express");
const expressFileUpload = require("express-fileupload");
const { fileUpload, retornaImagen } = require("../controllers/uploads");
const { validatJWT } = require("../middlewares/validar-jwt");

const router = Router();
router.use(expressFileUpload());

router.put("/:tipo/:id", validatJWT, fileUpload);
router.get("/:tipo/:foto", retornaImagen);

module.exports = router;
