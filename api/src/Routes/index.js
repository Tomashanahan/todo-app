const { Router } = require("express");
const Todos = require("./Todos");
const UsersRoutes = require('./Users/UsersRoutes')

const router = Router()

router.use('/todos', Todos)
router.use('/users', UsersRoutes)

module.exports = router;