const express = require("express");
const router = express.Router();
const {
	registrar,
	perfil,
	confirmarCuenta,
	iniciarSesion,
	recuperarPass,
  comprobarToken,
  nuevaPass,

} = require("../../Controllers/UserController");
const check_user_auth = require("../../Middleware/authmiddleware");

// PUBLICO
router.post("/registrar", registrar);
router.get("/confirm/:token", confirmarCuenta);
router.get("/iniciarSesion", iniciarSesion);
router.post("/recuperarPass", recuperarPass);
router.route("/recuperarPass/:token").get(comprobarToken).post(nuevaPass)

// PRIVADO
router.get("/perfil", check_user_auth, perfil);

module.exports = router;
