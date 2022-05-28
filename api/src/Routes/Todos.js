const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
	res.send("Soy el get de Todos");
});

module.exports = router