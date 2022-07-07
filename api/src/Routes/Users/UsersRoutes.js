const express = require("express");
const router = express.Router();
const { registrar } = require("../../Controllers/UserController");

router.get("/", registrar);

module.exports = router;
