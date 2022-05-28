const { Router } = require("express");
const Todos = require("./Todos");

const router = Router()

router.use('/todos', Todos)

module.exports = router;